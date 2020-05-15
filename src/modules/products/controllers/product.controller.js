let ProductModel = require('../models/product.model');

const fetchProducts = (req,res) => {
    console.log("req",req.userInfo)
    let queryProducts = ()=>{
        let query = [{$match:{}},{$limit:20}]

        ProductModel.Product.aggregate(query)
        .then(queryRes=>{
            res.status(200).json({data:queryRes})
        })
        .catch(err=>res.json({msg:"Uxpected Error in getting product"}))

    }

    queryProducts()
}

module.exports = {
    fetchProducts
}
