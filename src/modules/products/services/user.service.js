const db = require("../../../../models");
const Addresses = db.Addresses;
const insertAddress = (row) => {
    return Addresses.create(row);
}
const getAddress = (userId)=>{
    return Addresses.findAll({userId:userId, order: [['createdAt', 'DESC']]});
}
const editAddress = (user, updatedAddress) => {

    const address = {
        firstName:updatedAddress.firstName,
        lastName:updatedAddress.lastName,
        address:updatedAddress.address,
        city:updatedAddress.city,    
        pincode:updatedAddress.pincode,
        mobileNumber:updatedAddress.mobileNumber
    }
    return Addresses.update(address,
        {where:{id:updatedAddress.id},
    });
}
const deleteAddress = (id)=>{
    try{
        return Addresses.destroy({where:{id:id}});
    }catch(err){
        console.log("error is",err);
        throw new Error("Error in deleting the address");
    }
    
}


const user = {
    fetchWishmasters: async () => {
        try{
            return  await db.User.findAll({
                attributes:[[db.sequelize.fn('COUNT', db.sequelize.col('role')), 'noOfRecords']],
                where: {
                    role:"wishmaster"
                }
            })
        }catch(err){
            return err;
        }
        
    },
    updateWishmasterStatus:async({available,userId}) => {
        try{
            const query = {
                update:{
                    isAvailable:available
                },
                where:{
                    id:userId
                }
            }
            return  await db.User.update(query.update,{where:query.where})
        }catch(err){
            throw err;
        }   
    }
}

module.exports = {
    insertAddress,
    getAddress,
    editAddress,
    deleteAddress,
    user

}