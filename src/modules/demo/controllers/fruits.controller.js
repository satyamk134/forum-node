const ProductModel = require('../models/fruits.models');


let getfruits = (req, res) => {
    
    ProductModel.FruitSchema.find()
    .then(response=>{
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log("Error in getting the fruits");
        res.status(401);
    })

}


const  insertFruits = (req, res) =>{
    console.log("came here controller");
    ProductModel.FruitSchema.insertMany(req.body)
    .then(response=>{
        res.json(response);
    })
}

module.exports = {
    getfruits,
    insertFruits
}