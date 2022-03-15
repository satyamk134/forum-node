/***
 * Apis related to cart
 * cart
 * cart/add
 * cart/remove/{orderId}
 * cart/edit/{orderId}
 */
 const db = require("../../../../models");
 const Sequelize = require("sequelize");
 const {TransactionDetails} = db;

 
 

let test =(req, res)=>{
    res.send("test called in merchant");
}

let updateTrancation = async  (req)=>{
    let {id} = req;
    let row={
        debitAccount:0,   //company account with id 0
        creditAccount:3, //wishmaster account id
        walletTxnId:id,
        txnType:'wtb',
        source:'wallet'

    }
    try{
        await TransactionDetails.create(row);
    }catch(err){
        console.log("Error is",err);
        return Promise.reject({msg:"Error in updating the transcation details"});
    }
    
}

module.exports={
    test,
    updateTrancation,
}