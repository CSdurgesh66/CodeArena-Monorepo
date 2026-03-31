const express = require('express');

const {PORT} = require('./config/server.config');

const apiRouter = require('./routes/index');
const BaseError = require('./errors/base.error');
const errorHandler = require('./utils/errorHandler');
const connectDB = require('./config/database.config');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
