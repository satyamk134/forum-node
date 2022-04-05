const { request } = require('express');
const mongoose = require('mongoose');
const db = require("../../../../models");
const Sequelize = require("sequelize");
const { file } = require("googleapis/build/src/apis/file");
const Tutorial = db.tutorials;
const Product = db.products;
const Cart = db.carts;
const Op = Sequelize.Op

let ProductModel = require('../models/product.model');
let User =  db.User;
let Order = db.Order;
let Transit = db.OrderWishmaster;


var ObjectId = mongoose.Types.ObjectId;
const fetchProducts_old = (req,res) => {
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

const fetchProducts = (req, res)=>{
    console.log("fetch products will be called");
    Promise.all([Product.count(),Product.findAll({limit:20})])
    .then(response=>{
        let responseojb = {count: response[0],payload:response[1]}
        res.json(responseojb);
    })

    
    

}


module.exports = fetchProducts
