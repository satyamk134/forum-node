const user = require('../../../../models/user');
const userService = require('../services/user.service');
const addAddress = async (req, res) => {
    try{
        let address = {
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            address:req.body.address,
            city:req.body.city,
            pincode:req.body.pincode,
            mobileNumber:req.body.mobileNumber,
            userId:req.userInfo.userId
        };
        await userService.insertAddress(address);
        return res.json({'status':"Success",msg:"Address saved successfully"});

    }catch(err){
        console.log("error in adding the address",err);
    }
    
}

const getAddresses = async (req,res) => {
    let { userId } = req.userInfo;
    let addresses = await userService.getAddress(userId);
    return res.json({status:"success",payload:addresses});
}

const editAddress = async(req, res)=>{
    let addresses = await userService.editAddress(req.userInfo,req.body);
    return res.json({status:"success",payload:addresses});
}

const deleteAddress = async(req,res) => {
    let { id } = req.body;
    try{
        await userService.deleteAddress(id);
        return res.json({status:"success",msg:"Address deleted Successfully"});
    }catch(err){
        console.log("Error in deleting the address",err);
        throw new Error("Error in deleting the address");
    }
   
}

const wishmaster = {
    fetchTotal : async (_req, res, _next) => {
        try{
            const users =  await userService.user.fetchWishmasters()
            if(user.length>0){
                return res.json({msg:"user fetch success",payloadRes:users[0]})
            }
            return res.json({msg:"No records Found",payloadRes:users}).status(404)
            
        }catch(err){
            console.log("error is",err);
        }
    },
    updateStatus:async(req, res,_next)=>{
        try{
            const udadateStatus = await userService.user.updateWishmasterStatus(req.body)
            if(udadateStatus){
                res.json({msg:"Your status updated succesfully"});
            }            
        }catch(err){
            console.log("error is",err);
        }
    }
}



module.exports = {
    addAddress,
    getAddresses,
    editAddress,
    deleteAddress,
    wishmaster
}