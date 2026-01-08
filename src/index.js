const express = require('express');

const {PORT} = require('./config/server.config');

const apiRouter = require('./routes/index');
const BaseError = require('./errors/base.error');
const errorHandler = require('./utils/errorHandler');

const app = express();


app.use('/api',apiRouter);

app.get('/ping',(req,res) => {
    return res.json({message:'Problem Service is alive'});
})


app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`Server started at Port: ${PORT}`);
   
    
});
