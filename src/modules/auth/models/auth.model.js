const mongoose = require('mongoose');
var Schema = mongoose.Schema
//dbconnection.connectToDb();


/**
 * testsg Schema
 */
var UserSchema = new Schema({
   emailId:{type:String, required:true},
   password: { type: String, required:true },
   lastName:{type: String, required:true},
   firstName:{ type:String, required:true},
   role:{type:String, default:''},
   address: { type:String, default:""},
   mobileNo:{type:String, default:"" },
   role: {type: String, default:'customer'},
   provider:{type:String, default:"local"}

},{
   versionKey: false  });

exports.User = mongoose.model('User', UserSchema);