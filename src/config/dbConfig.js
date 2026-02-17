const mongoose = require('mongoose');

const {DB_URL, NODE_ENV} = require('./serverConfig');

const dbConnect = async () => {

    try{

        if(NODE_ENV == "development" ){
            await mongoose.connect(DB_URL);
            console.log("Mongodb connected")
        }   

    }catch(error){
         console.log('Unable to connect to the DB');
        console.log(error);
    }
   
}

module.exports = dbConnect;