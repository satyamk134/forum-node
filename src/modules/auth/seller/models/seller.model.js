const mongoose = require('mongoose');
var Schema = mongoose.Schema
//dbconnection.connectToDb();

/**
 * shop Schema
*/

var shopSchema = new Schema ({
    name: {type:String, default:'NA'},
    images:{type:Array, default:[]},
    category:{type:Array, default:[] },
    country:{},
    state:{ type:String, default:""},
    district:{type:String, default:"NA"},
    
})


var sellerSchema = new Schema({
    /**
     * email and password is used by seller by see the sell by login
    */

   //seller personal info
   emailId:{type:String, required:true},
   password: { type: String, required:true},
   lastName:{type: String, required:true},
   firstName:{ type:String, required:true},
   role:{type:String, default:''},
   address: { type:String, default:""},
   mobileNo:{type:String, default:"" },
   role: {type: String, default:'customer'},
   provider:{type:String, default:""},
  

   //shops which belong to the seller
   shops:{type: [shopSchema], default:[]}
},{ _id : false,versionKey: false  });

exports.User = mongoose.model('User', UserSchema);