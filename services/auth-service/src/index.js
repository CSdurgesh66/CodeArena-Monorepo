const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const { PORT } = require('./config/server.config');


const apiRouter = require('./routes/index');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);


app.get('/ping', (req, res) => {
    return res.json({ message: 'Auth Service is alive' });
});

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Auth Service started at Port: ${PORT}`);
    await connectDB();

});