const app = require('./app');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const envConfig = require('./config/index')();


// const dbConnection = require('./src/configs/db.connection');
// const dbConfig = require("./src/configs/db.config.js");

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const db = require("./models");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({
    extended: true
}));


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
const router = require('./src/modules/db-file-operations/db-file.router');
app.use('/api/auth', auth)
app.use('/api/file',fileDb)
/**
 * add the token for rest of the routes
*/


app.use('/api/chatbot', chatBotApp);
let productroutes = require('./src/modules/products/routes/index.router');
productroutes(app);

//app.use('/api', productroutes);

app.use(function(req,res){
    res.status(404).json({msg:'Resource Not Found'});
});
const errorHandler = require('./src/error-handlers')
http.createServer(app).listen(4001);
