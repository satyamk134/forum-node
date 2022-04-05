/***
 * Apis related to cart
 * cart
 * cart/add
 * cart/remove/{orderId}
 * cart/edit/{orderId}
 */
 const db = require("../../../../models");
 const Sequelize = require("sequelize");
 const {MerchantServiceDetails,MerchantServices} = db;

 
 

let test =(req, res)=>{
    res.send("test called in merchant");
}

let getServiceOptions = async (req)=>{

    const {serviceId} = req;
    let fetchDetails = async ()=>{
        try{
            let serviceOptions = await MerchantServices.findOne({
                where:{id:serviceId},
                include:[db.MerchantServiceDetails]
            });
            if(serviceOptions){
                return Promise.resolve(serviceOptions);
            }else{
                return Promise.reject({msg:"No service option found"});
            }
        }catch(err){
            throw new Error("Unexecpted Error occured in fetching the service options");
        }  
        
    }
    try{
        return await fetchDetails();
    }catch(err){
        return Promise.reject(err);
    }
    

}

module.exports = {
    test,
    getServiceOptions,
}