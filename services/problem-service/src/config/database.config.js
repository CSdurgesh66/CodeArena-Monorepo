const mongoose = require('mongoose');
const {DB_URL, NODE_ENV} = require('./server.config');

async function connectDB() {

    try{

        if(NODE_ENV=="development"){
            await mongoose.connect(DB_URL);
        }

    }catch(error){
        console.log('DB not connected');
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;