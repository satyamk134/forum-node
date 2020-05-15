const express = require('express');
const app = express();
const http = require('http');
const dbConnection = require('./src/configs/db.connection');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
dbConnection.connectToDb();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

let chatBotApp = require('./src/modules/chat-bot/routes/chat-bot.route');
let auth = require('./src/modules/auth/routes/auth.route');
let fileDb = require('./src/modules/db-file-operations/db-file.router');
let Product = require('./src/modules/products/routes/product.route');

app.use('/auth', auth)

/**
 * add the token for rest of the routes
*/
app.use((req,res,next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token){
        token = token.slice(7, token.length);
        console.log("token is",token);
        jwt.verify(token, 'secret', function(err, decoded) {
            if(err) {
                console.log("Error",decoded)
                res.status(403).json({status:"err",msg:"Invalid token"})
            } else {
                let date = new Date();
                if(decoded.exp *1000 < Date.now()){
                    res.status(403).json({status:"Error",msg:"Token Expired"})
                } else {
                    console.log("time is",Date.now());
                    if(decoded.data)
                    req.userInfo = decoded.data;
                    next()
                }
                
            }
            // bar
        });
    }else{
        res.status(403).json({status:"Error",msg:"Invalid Reqest"})
    }
    
})

app.use('/chatbot', chatBotApp)

app.use('/file',fileDb)
app.use('/product',Product)


app.use(function(req,res){
    res.status(404).json({msg:'Resource Not Found'});
});
http.createServer(app).listen(4545);
