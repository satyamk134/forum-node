/**
 * Apis related to order
 * /order/get
 * /order/put
 * /order/post
 * /order/delete
 */

 const { request } = require('express');
 const mongoose = require('mongoose');
 const db = require("../../../../models");
 const Sequelize = require("sequelize");
 const { file } = require("googleapis/build/src/apis/file");
 const Tutorial = db.tutorials;
 const Product = db.products;
 const Cart = db.carts;
 const Op = Sequelize.Op;
 let Order = db.Order;
 let Transit = db.OrderWishmaster;
 let User =  db.User;
 let orderDetails = db.OrderDetails; 

 let assignOrderForPickup = (req, res)=>{
    //order id and agentId is reqired

    let findAgent = ()=>{
        return User.findOne({
            where:{
                role:"wishmaster"
            }
        })
        .catch(err=>{
            console.log("Error not able to find the agent");
        })
    
    }
    let assignToAgent  = (agentDetails) => {
        //assign to delivery agent

        /**
         * req.body obj
         * 
         * {
         *   
         *   orderId:991
         *
         * }
         */
        let agentInfo = {agentId:agentDetails.id};
        Transit.create({...req.body,...agentInfo})
        .then(response=>{
            res.json({msg:"order assigned successfully"});
        })
    }

    findAgent()
    .then(assignToAgent)
    .catch(err=>{
        res.json({msg:"Error in assigning to agent"}).status(400);
    })
}

let assignOrderForDelivery = (req, res)=>{

}
let getAssignedOrder = async  (req, res)=>{
    try {
        console.log(req.userInfo);
        let orders = await  Transit.findAll({  where: {
            agentId: req.userInfo.userId
          },
          include:{model:Order,include:[User]},
          limit: 5,
        });

        res.json(orders).status(200);
    }catch(exception){
        console.log("Some error occured",exception);
        res.json({msg:"Some error occured"}).status(400);
    }
}

let addClothesInOrder = async(req,res)=>{
    /**
     * {
     *  orderId:2,
     *  agentId:1,
     *  unit: 'mass/quant',
     *  count: '2' or 3  (2kg  or 3 piece)
     *  clothType(service type): drywash, coldwash, steam press, normal press
     *  
     * }
     */
    try{
        let orderDetail = await orderDetails.create(req.body);
        res.json({msg:"Order save successfully"})
    }catch(exception){
        console.log("Error in save the order",exception);
        res.json({"msg":"Some error occured "});
    }
}

let addOrderDetails = async (req, res)=>{
    /**
     * req.body 
     * {
     *  orderId:2,
     *  agentId:1,
     *  unit: kg,
     *  count:2
     * }
     */
    try{

        let orderDetail = await orderDetails.create({...req.body});
        res.json({msg:"Order Upated Successfully"}).status(200);

    }catch(exception){
        console.log("Error in update order details",exception);

    }    
}

let fetchOrderDetails = async(req, res)=>{
    try{
       let orderDetail =  await orderDetails.findAll({where:{orderId:req.query.orderId}});
       res.json(orderDetail);

    }catch(exception){
        console.log("Error in getting the order details",err);
        res.json("Error in getting the order details");
    }

   
}

let bookPickupSlot = (req, res) => {
    let bookingDetails = req.body;
    console.log(req.userInfo);
    Order.create({...bookingDetails,userId:req.userInfo.userId})
    .then((resp)=>{
        res.status(200).json({msg:"Great!! Pickup slot booked."});
    })
    .catch(err=>{
        res.status(500).json({msg:"Error in booking slot, please try after some time"});
    })
}

let test =(req, res)=>{
    res.send("test called in order, thanks for calling");
}

module.exports = {
    assignOrderForPickup,
    assignOrderForDelivery,
    getAssignedOrder,
    addOrderDetails,
    fetchOrderDetails,
    bookPickupSlot,
    test
}


