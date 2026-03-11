const express = require('express')
const app = express()
const { PORT, SERVICES } = require('./config/server.config');
const { default: helmet } = require('helmet');
const proxyRoutes = require('./routes/proxyRoutes');
const logger = require('./config/logger');
const cors = require('cors');
const healthRoute = require('./routes/healthRoute');


app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthRoute);
app.use('/api', proxyRoutes);



// error handler
app.use((err, req, res, next) => {
    logger.error(`Unhandled error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Internal gateway error.' });
});


app.listen(PORT, () => {
    console.log(`server app listening on port ${PORT}`);


})

app.get('/test', (req, res) => {
    res.send({
        message: "Test route"
    })
})
