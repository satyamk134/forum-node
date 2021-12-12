const express = require('express');
const router = express.Router();
const cartRoutes = require('./cart.route');
const orderRoute = require('./order.route');

let routes  = (app)=>{
    console.log("came inside route function");
    app.use('/api/cart', cartRoutes);
    app.use('/api/order', orderRoute);
}

module.exports = routes;









