const express = require('express');

const {PORT} = require('./config/server.config');

const apiRouter = require('./routes/index');
const BaseError = require('./errors/base.error');
const errorHandler = require('./utils/errorHandler');
const connectDB = require('./config/database.config');

const app = express();


app.use('/api',apiRouter);

app.get('/ping',(req,res) => {
    return res.json({message:'Problem Service is alive'});
})

// last middleware
app.use(errorHandler);

app.listen(PORT, async() => {
    console.log(`Server started at Port: ${PORT}`);

    await connectDB();
    console.log("Successfully Connected to Db")   
    
});
