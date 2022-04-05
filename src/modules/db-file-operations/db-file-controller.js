let XLSX = require('xlsx');
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

let  csvToPremiumJson = (req, res)=>{
    let fileData = XLSX.readFile(process.cwd()+"\\uploads\\"+req.body.fileName, {default:""})
    let sheetData = XLSX.utils.sheet_to_json(fileData.Sheets[fileData.SheetNames[0]]);
    //console.log("sheet data is",sheetData);
    let premiumJson = {};
    for(let i=0;i<sheetData.length;i++){
        let eachRow = sheetData[i];
        let rowCopy = {...eachRow};
        delete rowCopy['SI Code'];
        premiumJson[eachRow['SI Code']] =  rowCopy;
        
    }
    res.json(premiumJson)
    //console.log("premium json is",premiumJson);
    
}

let sqlmigration = (req, res)=>{
    console.log("came inside ccontroller");
    let fileData = XLSX.readFile(process.cwd()+"/uploads/"+'explore-v3-premium-sheet.ods', {default:""})
    let sheetData = XLSX.utils.sheet_to_json(fileData.Sheets[fileData.SheetNames[0]]);
    let planName = [];
    let planObj = {
        "Asia":{'single':1,multi:17,planId:1},
        "Africa":{'single':2,multi:2, planId:2},
        "ANZ":{'single':18,multi:18,planId:7},
        "Europe":{'single':3,multi:3,planId:3},
        "Worldwide - Silver":{'single':5,multi:8,planId:5},
        " Worldwide - Gold":{'single':6,multi:9,planId:5},
        "Worldwide- Platinum":{'single':7,multi:10,planId:5},
        "WW excl US/CAN- Silver":{'single':11,multi:14,planId:6},
        " WW excl US/CAN- Gold":{'single':12,multi:15,planId:6},
        "WW excl US/CAN- Platinum":{'single':13,multi:16,planId:6},
        "Canada +":{'single':4,multi:4,planId:4},
        
        
    }
    
    let premiumData = [];
    for(let i=0;i<sheetData.length;i++){
        if(!planName.includes(sheetData[i]['Plan Name'])){
            planName.push(sheetData[i]['Plan Name']);
        }
        let planId = {planId: planObj[sheetData[i]['Plan Name']]};

        /**
         * check for trip type as single or multiple
        */

        let otherDetailsForPremium = {};
        if(sheetData[i]['Trip Type'].trim() == 'Single'){
            console.log("came for single");
            otherDetailsForPremium['tripType']= 'Single';
            otherDetailsForPremium['planCode'] = planObj[sheetData[i]['Plan Name']][sheetData[i]['Trip Type'].toLowerCase()];
            otherDetailsForPremium['planType'] = planObj[sheetData[i]['Plan Name']]['planId'];
         }else{
            //mult-trip
            otherDetailsForPremium['tripType']= 'Multi';
            otherDetailsForPremium['planCode'] = planObj[sheetData[i]['Plan Name']]['multi'];
            otherDetailsForPremium['planType'] = planObj[sheetData[i]['Plan Name']]['planId'];
        }


        /**
         * logic for min and max age
        */

        if(sheetData[i]['Age Band']=='<40'){
            otherDetailsForPremium['minAge'] = 0;
            otherDetailsForPremium['maxAge'] = 40;
        }else if(sheetData[i]['Age Band']=='>85'){
            otherDetailsForPremium['minAge'] = 86;
            otherDetailsForPremium['maxAge'] = 99;
        }else{
            let ages = sheetData[i]['Age Band'].split('-');
            otherDetailsForPremium['minAge'] = ages[0].trim();
            otherDetailsForPremium['maxAge'] = ages[1].trim();

        }
        otherDetailsForPremium['coverType'] = 'Individual';
        sheetData[i] = {...sheetData[i],...otherDetailsForPremium};
        console.log(sheetData[i]);
        let keys = [
        'Age Band','minAge','maxAge','planType','planCode',
        'Plan Name','Sum Insured','coverType',
        'tripType','Term',' Base Premium'
        ];
        // let eachRow = [];
        // keys.forEach(element => {
        //     eachRow.push(sheetData[i][element]);
        // });
        let tableColObj = {
        'ageGroup':sheetData[i]['Age Band'], 
         minAge :sheetData[i]['minAge'],
         maxAge:sheetData[i]['maxAge'], 
         planType:sheetData[i]['planType'],
         planCode:sheetData[i]['planCode'], 
         planName:sheetData[i]['Plan Name'],
         sumInsured:sheetData[i]['Sum Insured'], 
         coverType:sheetData[i]['coverType'],
         tripType:sheetData[i]['tripType'],
         days:sheetData[i]['Term'],
         premium:sheetData[i]['with PED']
        }
        premiumData.push(tableColObj);


        
        
        //if(i==900)break;
        

    }
    res.json({sheetData:premiumData,count:premiumData.length});
    
}

module.exports =  {
    insertUsers,
    classTest,
    fetchUsers,
    addProducts,
    slugcsv,
    csvToPremiumJson,
    sqlmigration
}