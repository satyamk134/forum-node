/***
 * Apis related to cart
 * cart
 * cart/add
 * cart/remove/{orderId}
 * cart/edit/{orderId}
 */
 const { request } = require('express');
 const mongoose = require('mongoose');
 const db = require("../../../../models");
 const Sequelize = require("sequelize");
 const path = require('path');
 const fs = require('fs');
 const walletService = require('../services/wallet.service');
 const {Wallets, WalletTransactions} = db;
 // Imports the Google Cloud client library
 const {Storage} = require('@google-cloud/storage');
 
 

let test =(req, res)=>{
    res.send("test called in merchant");
}

let addOrDecuctFromWallet = async (req, res)=>{ 
    if(req.userInfo){
        req.body = {...req.body,...req.userInfo};
    }

    let {amount, source, action, userId, description} = req.body;
    let row = {
        amount:amount,
        source:source,
        action:action,
        previousBalance:0,
        updatedBalance:amount
    }
    let wallet = await Wallets.findOne({where:{userId:userId}});
    try{
        if(action == 'add'){
            //Add transaction in walletTransactions
            if(wallet){
                let balance = wallet.balance + amount;
                row = {
                        ...row,
                        updatedBalance:balance,
                        previousBalance:wallet.balance,
                        action:action,
                        walletId:wallet.id,
                        description:description
                }
                let transaction = await WalletTransactions.create(row);
                await Wallets.update({balance:balance},{where:{id:wallet.id}});
                res.json({msg:`Wallet updated ${balance}`, transaction:transaction})
            }
        }else if(action == 'sub'){
            if(wallet && wallet.balance>=amount){
                let balance = wallet.balance - amount;
                row = {
                        ...row,
                        updatedBalance:balance,
                        previousBalance:wallet.balance,
                        action:action,
                        walletId:wallet.id,
                        description:description
                }
                let transaction = await WalletTransactions.create(row);
                await Wallets.update({balance:balance},{where:{id:wallet.id}});
                await walletService.updateTrancation(transaction);

                res.json({msg:`Wallet updated ${balance}`, transaction:transaction})
            }else{
                res.json({"msg":"wallet abalance is not sufficient"}).statu(500);
            }
        }else{
            res.json({msg:"Unknow operation"}).status(500);
        }
    }catch(err){
        console.log("Unexpected Error occured while adding to wallet",err);
        res.json({"msg":"Unexpected Error occured while withdraw,Please try again"});
    }
}






let getWalletDetails = async(req, res)=>{
    let {userId} = req.userInfo;

    try{
        
        let walletDetails = await Wallets.findOne({
            where:{userId:userId},
            include:[db.WalletTransactions]
        });
        return res.json({payload:walletDetails, status:"success"});
        
    }catch{
        console.log("Error in getting the waller transcations",err);
        res.json({msg:"Error in getting the wallet transactions"}).status(500);
    }
   
}

module.exports={
    test,
    addOrDecuctFromWallet,
    getWalletDetails
}