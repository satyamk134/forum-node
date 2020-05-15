const mongoose = require('mongoose');
var Schema = mongoose.Schema
//dbconnection.connectToDb();


/**
 * testsg Schema
 */
var ProductSchema = new Schema({
   produtId:'',
   category:{type:String, default:""},
   productName:{type:String, default:'NA'},
   sellingPrice:{ type:Number},
   images:[{image_direction:{type:String, default:"Main"}, link: {type:String,default:""}}],
   sellerId:{type:String, default:""},
   details:[]

},{ _id : false,versionKey: false  });
exports.Product = mongoose.model('Product', ProductSchema);

