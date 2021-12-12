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
 const { file } = require("googleapis/build/src/apis/file");
 const Tutorial = db.tutorials;
 const Product = db.products;
 const Cart = db.carts;
 const Op = Sequelize.Op

 const addToCart = (req, res) => {
    //add to cart of a user

    console.log(req.userInfo);

    let findUser = ()=>{
        //find the user id using email
        let match = {where:{ emailId:req.userInfo.emailId},raw:true};
        return User.findAll(match);
    
    }

    

    let updateCartOfUSer = (userDetails) => {
        //update user  

        /**
         * 1. New user , new product
         * 2. old user, old product
         * 3. user exist, new product
        */
        let userInfo = userDetails[0];
        
        console.log("user info",userInfo); 
        let match = {where:{userId: userInfo.id, "productId":req.body.productId}};

        let findCart = () => {

            return Cart.findAll(match);

        }

        let updateCart = (cartStatus) => {
            console.log("Came inside update cart",cartStatus.length);
                let matchStatement = {};
                let updateStatement = {};
                if(cartStatus && cartStatus.length > 0) {
                    //if has product added, increment count then
                    //matchStatement = {"products.productId": ObjectId(req.body.productId),userId: userInfo._id};
                    matchStatement = {"productId": req.body.productId,userId: userInfo.id};
                    updateStatement = {count:Sequelize.literal('count + 1')};
                    return  Cart.update(updateStatement,{where:matchStatement})
                }else{
                    let cart = {ProductId:req.body.productId, count:1,UserId:userInfo.id};
                    console.log("cart===>",cart);
                    return  Cart.create(cart);
                }
        }

      return findCart()
            .then(updateCart)
            .catch(err=>{
                console.log("Error in updating the cart",err);
                return Promise.reject({"Status": "Not able to add product in Cart"});
            })
         
        

        //action can will add or remove product
        //let update = {$push:{products:{_id:req.body.productId}}};


       
    }

    findUser()
    .then(updateCartOfUSer)
    .then(resp=>{
        res.json({status:"success"})
    })
    .catch(err=>{
        res.json(err);
    })
    



}

const removeFromCart = (req, res)=>{
    let findUser = ()=>{
        //find the user id using email
        let match = {where:{emailId: req.userInfo.emailId}};
        return User.findOne(match)
    
    }

    let updateCartOfUSer = (userInfo) => {
        //update user  

        /**
         * 1. New user , new product
         * 2. old user, old product
         * 3. user exist, new product
        */
    
        let match = {userId: userInfo.id,productId: req.body.productId, count:{[Op.gte]:1}};

        let  updateCart = async (itemStatus) => {


            //if count 1 is found the remove the item from cart
            //else decement the count
            let matchStatement = {};
            let updateStatement = {};
          

            //remove item from cart
            matchStatement = { where:{userId: userInfo.id, productId:req.body.productId}};
            let cartItem = await  Cart.findOne(matchStatement);
            if(cartItem.count >1){
                //decrement
                await cartItem.decrement('count');
            }else{
                //delte
                await cartItem.destroy();

            }             
        }

        return updateCart()
            .then(resp=>{
                res.json({status:"success"})
            })
            .catch(err=>{
                console.log("Error in updating the cart");
            })
         
           
    }

    findUser()
    .then(updateCartOfUSer)
    .catch(err=>{
        console.log("Unexpected internal server error occured",err);

    })


}

let getUserCart  = (req, res) => {
    /**
     * fetch user cart count
    */

   let findUser = ()=>{
    //find the user id using email
        let match = {where:{emailId: req.userInfo.emailId}};
        return User.findOne(match)
   }

   let getCart = (userInfo)=>{

        let ProductsPromise = Cart.findAll({
            attributes: [ [Sequelize.fn('sum', Sequelize.col('count')), 'count']],
            where:{userId:userInfo.id},
            group:['userId']
        });
       
        return ProductsPromise.then(resp=>{
            if(resp.length>0){
                let response = {noOfItems:resp[0].count};
                res.json(response);
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
            let match = {where:{emailId: req.userInfo.emailId},raw:true};
            return User.findOne(match);
    }  

    let  findCartDetails = async (userInfo)=>{

        console.log("userinfo",userInfo);
        let matchStatement = {where:{userId:userInfo.id}};

        
        
        //-----first get the product ids from cart
        let products = [];
        try {

            //now mysql code for getting cart details

            products = await Cart.findAll({
                where:{userId:userInfo.id},
                include:{
                    model:db.products,
                },
                
                
            })
        }catch(err){
            console.log("Error in getting the cart details");
            Promise.reject("Not able to get cart details");
        }

        if(products.length >0){

            res.json({products});

        }else{
            //when cart is empty
            Promise.reject({msg:"Cart is empty"});
        }
        
    }

    findUser()
    .then(findCartDetails)
    .catch(err=>{
        console.log("Errr is",err);
        res.json({msg:"No able to find your cart"}).status(500);
    })
}



let test =(req, res)=>{
    res.send("test called in cart");
}

module.exports={
    addToCart,
    getUserCart,
    getCartProductDetails,
    removeFromCart,
    test
}