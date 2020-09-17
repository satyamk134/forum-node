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

let slugcsv = (req, res)=>{

    let fileData = XLSX.readFile(process.cwd()+"/uploads/care-advantage.xls", {default:""})
    let sheetData = XLSX.utils.sheet_to_json(fileData.Sheets[fileData.SheetNames[0]])
    console.log("sheet data is",sheetData);
    
    var slugs = [];
    let sheetWithDetails = sheetData.map(element => {
        let coverType = element['Cover Type'];
        if(coverType == 'Individual'){
            coverType = 'INDIVIDUAL';
        }else{
            coverType = 'FAMILYFLOATER';
        }


        yearsE = "99 - 99";
         if (element['Age Band'] == 'Above 75 Years'){
            yearsE = "76 - 99";
        }else{
            // yearS = element['Age Band'].slice(0,2);
            // yearE = element['Age Band'].slice(4,6);
            yearsE = element['Age Band'].slice(0,7);


        }

        //addding the SI code
        // 001: 25L Individual

        // 002: 25L Floater

        // 003: 50L Individual

        // 004: 50L Floater

        if(element['Sum Insured'] == '25 lacs' && element['No. of Members'] == 1){
            sicode = '001';
        }else if(element['Sum Insured'] == '50 lacs' && element['No. of Members'] == 1){
            sicode = '003';
        }else if(element['Sum Insured'] == '25 lacs' && element['No. of Members'] > 1){
            sicode = '002';
        }else{
            sicode = '004';
        }
      
            
        let slug = coverType + ":" +yearsE +":"+element['No. of Adults']+":"+element['No. of Children']+":"+element['Term']+":"+sicode;
        

        let obj = {plan:slug+","+element['Premium']};
        slugs.push(obj);

        let workbook = XLSX.utils.book_new();
        let worksheet = XLSX.utils.json_to_sheet(slugs);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'caread1');
        XLSX.writeFile(workbook, 'out.xlsb');


    });
    res.json(slugs);

   

}

module.exports =  {
    insertUsers,
    classTest,
    fetchUsers,
    addProducts,
    slugcsv
}