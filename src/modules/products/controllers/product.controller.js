const { request } = require('express');
const mongoose = require('mongoose');
let ProductModel = require('../models/product.model');
let User =  mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;
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

        /**
         * 1. New user , new product
         * 2. old user, old product
         * 3. user exist, new product
        */
       
        console.log("user info",req.body.productId); 
        let match = {userId: userInfo._id, "products._id":req.body.productId};

        let findCart = () => {

            return ProductModel.Cart.find(match)
        }

        let updateCart = (cartStatus) => {
            console.log("Came inside update cart",cartStatus.length);
                let matchStatement = {};
                let updateStatement = {};
                if(cartStatus && cartStatus.length > 0){
                    //if has product added, increment count then
                    matchStatement = {"products._id": req.body.productId,userId: userInfo._id};
                    updateStatement = {$inc:{ "products.$.count":1}};
                    return  ProductModel.Cart.updateOne(matchStatement,updateStatement)
                }else{
                    matchStatement = {userId: userInfo._id};
                    updateStatement =  {$push:{products:{_id:req.body.productId}}};
                    return  ProductModel.Cart.updateOne(matchStatement,updateStatement,{upsert:true})
                }
                

                
        }

        return   findCart()
            .then(updateCart)
            .catch(err=>{
                console.log("Error in updating the cart");
            })
         
        

        //action can will add or remove product
        //let update = {$push:{products:{_id:req.body.productId}}};


       
    }

    findUser()
    .then(updateCartOfUSer)
    .then(resp=>{
        res.json({status:"success"})
    })
    



}

let getUserCart  = (req, res) => {
    /**
     * fetch user cart count
    */

   let findUser = ()=>{
    //find the user id using email
        let match = {emailId: req.userInfo.emailId};
        return User.findOne(match)
   }

   let getCart = (userInfo)=>{

        let ProductsPromise = ProductModel.Cart.aggregate([{"$match": {userId: ObjectId(userInfo._id)}}, {$project:{_id:0,noOfItems:{$size:"$products"}}}]);
        console.log(req.userInfo);
        return ProductsPromise.then(resp=>{
            if(resp.length>0){
                res.json(resp[0])
            }else{
                res.json([]);
            }
        
        });
   }
    
    
    findUser()
    .then(getCart)


}

let getCartProductDetails = (req, res)=>{
    let findUser = ()=>{
        //find the user id using email
            let match = {emailId: req.userInfo.emailId};
            return User.findOne(match)
    }  

    let  findCartDetails = async (userInfo)=>{
        
        //-----first get the product ids from cart
        let products = []
        try {

            products = await ProductModel.Cart.find({userId: userInfo._id});

        }catch(err){
            console.log("Error in getting the cart details");
            Promise.reject("Not able to get cart details");
        }

        console.log("products are"+JSON.stringify(products));

        

        if(products.length >0){


        }else{
            //when cart is empty
        }
        
    }

    findUser()
    .then(findCartDetails)
}





module.exports = {
    fetchProducts,
    addToCart,
    getUserCart,
    getCartProductDetails
}
