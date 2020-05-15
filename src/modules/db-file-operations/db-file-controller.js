let XLSX = require('xlsx');
let model = require('../../modules/auth/models/auth.model');
let authService = require('../../modules/auth/oauth/user.service');
let acl = require('./acl-class');
let ProductModel = require('../products/models/product.model');

let insertUsers = (req, res)=>{
    console.log("path is",process.cwd()+"/uploads/user.xlsx")
    let fileData = XLSX.readFile(process.cwd()+"/uploads/users.xlsx", {default:""})
    console.log("sheets are",fileData.SheetNames);
    //fileData.Sheets(fileData.SheetNames[0]);

    let sheetData = XLSX.utils.sheet_to_json(fileData.Sheets[fileData.SheetNames[0]])
    console.log("sheet data is",sheetData);

    let createUsers  = async ()=>{
        let executionArr = [];
        for(let i=0;i<sheetData.length;i++) {
            executionArr.push(authService.insertUser(sheetData[i]))

        }

        for(i=0;i<sheetData.length;i++){
            await executionArr[i];
        }
    }
    createUsers()
    .then(resp=>{
        res.status(200).json({status:"sucess",'msg':"User create"})
    })
}

let classTest  = (req, res) => {
    console.log("class is test getting done");
    acl = new acl.Acl('vikrma');
    console.log("acl call function "+acl.printName());
    res.json({status:"success",msg:"yes please"});
}

let fetchUsers = (req, res)=>{
    model.User.find()
    .then(response => {
        res.status(200).json({data:response})
    })
}

let addProducts = (req, res) => {
    
    let fileData = XLSX.readFile(process.cwd()+"/uploads/Adidas final.xlsx", {default:""})
    let sheetData = XLSX.utils.sheet_to_json(fileData.Sheets[fileData.SheetNames[0]])
    console.log("sheet data is",sheetData);
    

    let sheetWithDetails = sheetData.map(element => {
        return {
            ...element,productName:element['Product Name'],
            sellingPrice:element['Listing Price'],
            details:{...element },
            images:JSON.parse(element['Images']).map(image=>({link:image}))
        }
    });

    ProductModel.Product.insertMany(sheetWithDetails)
    .then(response=>{
        console.log("Response is",response);
        res.json({status:"success",msg:"Products Inserted"});
    })
    .catch(err=>{
        res.json({status:"Error",msg:"Some error in inserting"})
    })





} 

module.exports =  {
    insertUsers,
    classTest,
    fetchUsers,
    addProducts
}