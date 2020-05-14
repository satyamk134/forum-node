const express = require('express');
const app = express();
const http = require('http');
const dbConnection = require('./src/configs/db.connection');
var bodyParser = require('body-parser')
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

app.use('/chatbot', chatBotApp)
app.use('/auth', auth)
app.use('/file',fileDb)


app.use(function(req,res){
    res.status(404).json({msg:'Resource Not Found'});
});
http.createServer(app).listen(4545);
