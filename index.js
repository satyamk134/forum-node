const express = require('express');
const app = express();
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

// const dbConnection = require('./src/configs/db.connection');
// const dbConfig = require("./src/configs/db.config.js");

var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var cors = require('cors')
//dbConnection.connectToDb();

//dbConnection.mysqlConnection;
const db = require("./models");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Host");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true); 
    next();
});
app.use((req, res,next)=>{
    console.log("path is===>",req.path);
    next()
})




let chatBotApp = require('./src/modules/chat-bot/routes/chat-bot.route');
let auth = require('./src/modules/auth/routes/auth.route');
let fileDb = require('./src/modules/db-file-operations/db-file.router');
//let Product = require('./src/modules/products/routes/product.route');
const router = require('./src/modules/db-file-operations/db-file.router');
app.use('/api/auth', auth)
app.use('/api/file',fileDb)
/**
 * add the token for rest of the routes
*/

//uncomment this code if you want to use token
app.use('/api',(req,res,next)=>{
    console.log("req path is",req.path);
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token){
        token = token.slice(7, token.length);
        
        jwt.verify(token, 'secret', function(err, decoded) {
            if(err) {
                console.log("Error",decoded);
                let err = {status:"err",msg:"Invalid token"}
                res.status(403).json({err})
            } else {
                let date = new Date();
                if(decoded.exp *1000 < Date.now()){
                    let err = {status:"Error",msg:"Token Expired"}
                    res.status(403).json({err})
                } else {
                    if(decoded.data)
                    req.userInfo = decoded.data;

                    //fetch user

                    next()
                }
                
            }
            // bar
        });
    }else{
        //need to handle option preflight request
        let err = {status:"Error",msg:"Invalid Reqest"};
        res.status(200).json(err)
    }
})

app.use('/api/chatbot', chatBotApp);
let productroutes = require('./src/modules/products/routes/index.router');
productroutes(app);

//app.use('/api', productroutes);

app.use(function(req,res){
    res.status(404).json({msg:'Resource Not Found'});
});
http.createServer(app).listen(4343);
