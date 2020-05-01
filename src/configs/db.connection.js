const mongoose = require('mongoose');
// const config = require('../configs/db.config');

exports.connectToDb = ()=>{
    /**
     * For local 
    */
   'mongodb://localhost/'
   //mongoose.connect('mongodb://'+config.connection.database.host+':'+config.connection.database.port+'/'+config.connection.database.database, {useNewUrlParser: true})
    /**
     * For catalog Dev
    */
   //console.log("connection string is"+'mongodb://'config.connection.catalog_dev.username+':'+config.connection.catalog_dev.password+'@'+config.connection.catalog_dev.host+':'+config.connection.catalog_dev.port+'/'+config.connection.catalog_dev.database+'?ssl=true')
 
   //mongoose.connect('mongodb://'+config.connection.database.host+':'+config.connection.database.port+'/'+config.connection.database.database, {useNewUrlParser: true})
   //console.log("url is",'mongodb://'+config.connection.database.host+':'+config.connection.database.port+'/'+config.connection.database.database)
   mongoose.connect('mongodb://localhost:27017/forum', {useNewUrlParser: true});
   //mongoose.connect('mongodb://user:Qwerty_123@cluster-cataloging-shard-00-02-5gmlz.mongodb.net:27017/catalog-v3?retryWrites=true&ssl=true&authSource=admin')
   mongoose.set('debug', true);
    mongoose.connection.on('connected', function() {
        console.log("Db is successfully connected")
    });
    mongoose.connection.on('error', function(err) {
        console.log("Error in connecting to the DB",err)
    });
    mongoose.connection.on('disconnected', function(err) {
        console.log("DB connection is disconneted",err)
    });
}