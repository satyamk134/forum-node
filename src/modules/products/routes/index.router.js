const express = require('express');
const router = express.Router();
const cartRoutes = require('./cart.route');
const orderRoute = require('./order.route');
const merchantRoute = require('./merchant.route');
const jwt = require('jsonwebtoken');

let routes  = (app)=>{
    console.log("came inside route function");
    // predicate the router with a check and bail out when needed
    app.use('/api/cart',router, cartRoutes);
    app.use('/api/order',router, orderRoute);
    app.use('/api/merchant',merchantRoute);
}

router.use((req,res,next)=>{
    console.log("req path is",req.path);
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token){
        token = token.slice(7, token.length);
        
        jwt.verify(token, 'secret', function(err, decoded) {
            if(err) {
                console.log("Error",decoded);
                let err = {status:"err",msg:"Invalid token"}
                res.status(403).json({err})
            } else {
                let date = new Date();
                if(decoded.exp *1000 < Date.now()){
                    let err = {status:"Error",msg:"Token Expired"}
                    res.status(403).json({err})
                } else {
                    if(decoded.data)
                    req.userInfo = decoded.data;

                    //fetch user

                    next()
                }
                
            }
            // bar
        });
    }else{
        //need to handle option preflight request
        let err = {status:"Error",msg:"Invalid Reqest"};
        res.status(200).json(err)
    }
});     

module.exports = routes;









