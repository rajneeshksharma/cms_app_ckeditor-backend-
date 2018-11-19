/*
 * The file will take care of the database connectivity
 */

// development Db.js
var mongoose = require('mongoose');
var uri =  process.env.MONGODB_URI || "mongodb://root:root1234@ds247077.mlab.com:47077/rk_cmsapp";
var options = {
    user: '',
    pass: '',
    // server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
    reconnectTries: 10,
    useNewUrlParser: true 
};

 mongoose.Promise =global.Promise

 mongoose.connect(uri, options).then(
 () => {console.log('Databse is connected')},
 () => {console.log('Connection not connected')}
 )

