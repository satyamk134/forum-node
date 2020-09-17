const { request } = require('express');
const mongoose = require('mongoose');
let ProductModel = require('../models/product.model');
let User =  mongoose.model('User');
const fetchProducts = (req,res) => {
    console.log("req",req.userInfo)
    let queryProducts = ()=>{
        let query = [{$match:{}},{$limit:20}]

        ProductModel.Product.aggregate(query)
        .then(queryRes=>{
            res.status(200).json({data:queryRes})
        })
        .catch(err=>res.json({msg:"Uxpected Error in getting product"}))

    }

    queryProducts()
}

const addToCart = (req, res) => {
    //add to cart of a user

    console.log(req.userInfo);

    let findUser = ()=>{
        //find the user id using email
        let match = {emailId: req.userInfo.emailId};
        return User.findOne(match)
    
    }

    let updateCartOfUSer = (userInfo) => {
        //update user  
        console.log("user info",userInfo._id); 
        let match = {userId: userInfo._id};

        //action can will add or remove product
        let update = {$push:{products:{_id:req.body.productId}}};

       return  ProductModel.Cart.findOneAndUpdate(match,update,{upsert:true})
    }

    findUser()
    .then(updateCartOfUSer)
    .then(resp=>{
        res.json({status:"success"})
    })
    



}

module.exports = {
    fetchProducts,
    addToCart
}
