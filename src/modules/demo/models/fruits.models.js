const mongoose = require('mongoose');
var Schema = mongoose.Schema
//dbconnection.connectToDb();


/**
 * testsg Schema
 */
var FruitSchema = new Schema({
   name:{type:String, default:''},
   taste:{type:String, default:'NA'},
   price:{type:Number, default:100},
   water:{type:Number, default:20}
},{ _id : false,versionKey: false  });
exports.FruitSchema = mongoose.model('Fruit', FruitSchema);

