const db = require("../mModels");
const Sequelize = require("sequelize");
let XLSX = require('xlsx');
const { file } = require("googleapis/build/src/apis/file");
const Tutorial = db.tutorials;
const Product = db.products;
const Op = db.Sequelize.Op;

const saveTutorial = async (req, res) => {
    console.log("req is",req.body);
    const sample = await Tutorial.create({ title: "Jane",description:"my name is description",  published:1});
    res.json(sample);
}

const readFile = (req )=>{
   
        let fileData = XLSX.readFile(process.cwd()+"\\uploads\\"+req.body.fileName, {default:""})
        let sheetData = XLSX.utils.sheet_to_json(fileData.Sheets[fileData.SheetNames[0]]);
        //console.log("sheet data is",sheetData);
        let modelData = {};
        let modelDatas = [];
        sheetData.forEach(element=>{
            modelData = {};
            modelData['cateogory'] = "shoes";
            modelData['productName'] = element['Product Name'];
            modelData['productId'] = element['Product ID'];
            modelData['listingPrice'] = element['Listing Price'];
            modelData['salePrice'] = element['Sale Price'];
            modelData['discount'] = element['Discount'];
            modelData['brand'] = element['Brand'];
            modelData['rating'] = element['Rating'];
            modelData['reviews'] = element['Reviews'];
            modelData['frontImage'] = JSON.parse(element['Images'])[0];
            modelData['backImage'] = JSON.parse(element['Images'])[1];
            modelData['leftImage'] = JSON.parse(element['Images'])[2];
            modelData['rightImage'] = JSON.parse(element['Images'])[3];
            modelData['topImage'] = JSON.parse(element['Images'])[4];
            modelData['bottomImage'] = JSON.parse(element['Images'])[5];
            modelData['sellingPrice'] = element['Sale Price'];
            modelData['listingPrice'] = element["Listing Price"];
            modelData['url'] = element["URL"];
            modelDatas.push(modelData);

        })
        
        
        return modelDatas;
        //console.log("premium json is",premiumJson);
        /**
         * "URL": "https://shop.adidas.co.in/#!product/AH2430_nmd_racerpkw",
            "Product Name": "Women's adidas Originals NMD_Racer Primeknit Shoes",
            "Product ID": "AH2430",
            "Listing Price": 14999,
            "Sale Price": 7499,
            "Discount": 50,
            "Brand": "ORIGINALS",
            "Description": "Channeling the streamlined look of an '80s racer, these shoes are updated with modern features. The foot-hugging adidas Primeknit upper offers a soft, breathable feel. The Boost midsole provides responsive comfort accented with a contrast-color EVA heel plug. Embroidered details add a distinctive finish.",
            "Rating": 0,
            "Reviews": 0,
            "Images": "[\"https://content.adidas.co.in/static/Product-AH2430/WOMEN_Originals_SHOES_LOW_AH2430_1.jpg\",\"https://content.adidas.co.in/static/Product-AH2430/WOMEN_Originals_SHOES_LOW_AH2430_2.jpg\",\"https://content.adidas.co.in/static/Product-AH2430/WOMEN_Originals_SHOES_LOW_AH2430_3.jpg\",\"https://content.adidas.co.in/static/Product-AH2430/WOMEN_Originals_SHOES_LOW_AH2430_4.jpg\",\"https://content.adidas.co.in/static/Product-AH2430/WOMEN_Originals_SHOES_LOW_AH2430_5.jpg\",\"https://content.adidas.co.in/static/Product-AH2430/WOMEN_Originals_SHOES_LOW_AH2430_6.jpg\"]",
            "Last Visited": 43934.62944444444
         */
        
    
}

const saveToProducts = (req, res) => {
    console.log("save to products called");
    let fileData = readFile(req);
    Product.bulkCreate(fileData).then(response=>{
            res.json({msg:"data inserted"});

    });
    //res.json(fileData);
}

const getProducts = ( req, res)=> {

}

module.exports = {
    saveTutorial,
    readFile,
    saveToProducts
}