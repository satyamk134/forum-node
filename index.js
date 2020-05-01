const express = require('express');
const app = express();
const http = require('http');
const dbConnection = require('./src/configs/db.connection');

dbConnection.connectToDb();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

let chatBotApp = require('./src/modules/chat-bot/routes/chat-bot.route');
let auth = require('./src/modules/auth/routes/auth.route')
app.use('/chatbot', chatBotApp)
app.use('/auth', auth)
http.createServer(app).listen(4545);
