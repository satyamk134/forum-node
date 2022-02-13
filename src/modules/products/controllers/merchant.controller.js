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
 // Imports the Google Cloud client library
 const {Storage} = require('@google-cloud/storage');
 const MerchantServices = db.MerchantServices;
 const Merchant = db.Merchant;
 let fetchSerivcesOffered = async (req,res)=>{

    let shopId = req.query.shopId;
    let fetchMerchant = await Merchant.findOne({where:{id:shopId}});
    let services = await MerchantServices.findAll({where:{merchantId:shopId}});
    res.json({merchant:fetchMerchant,services:services});
    
 }

 let uploadMyFile = () => {
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // The ID of your GCS bucket
    const directoryPath = process.cwd()+'/uploads/laundary/';
    const bucketName = 'myluck';
    console.log(process.cwd()+'/uploads/darwin');

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file,i) {
            console.log(file);
            // Do whatever you want to do with the file
            uploadFile(directoryPath+file,i+1);
        });
    });

    let uploadFile = async(path,i)=>{
        // The path to your file to upload
        const filePath = path;
        // The new ID for your GCS file
        const destFileName = 'laundary/'+i+".jpeg";
        // Creates a client
        console.log("file paht",filePath);
        const storage = new Storage();

        async function uploadFile() {
        await storage.bucket(bucketName).upload(filePath, {
            destination: destFileName,
        });

        console.log(`${filePath} uploaded to ${bucketName}`);
        }

        uploadFile().catch(console.error);
    }        
 }

 let getMerchantList = (req,res)=>{

    let  fetchMerchant = async () => {
        let merchant =  Merchant.findAll();
        return merchant
    }
    fetchMerchant()
    .then(result=>{
        res.json(result);
    })
    .catch(console.error);

 }

 let getServiceDetails = async (req, res) => {
     console.log("req.query",req.query);
    try{
        let serviceDetails = await MerchantServices.findOne({where:{id:req.query.serviceId}});
        //console.log("serviceDetails",serviceDetails);
        return res.json(serviceDetails);
    }catch(err){
        res.status(402).json({"msg":"Not able to find any service"});
    }
 }

let test =(req, res)=>{
    res.send("test called in merchant");
}




module.exports={
    test,
    fetchSerivcesOffered,
    getMerchantList,
    uploadMyFile,
    getServiceDetails
}