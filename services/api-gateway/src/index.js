const express = require('express')
const app = express()
const { PORT } = require('./config/server.config');
const { default: helmet } = require('helmet');
const proxyRoutes = require('./routes/proxyRoutes');
const logger = require('./config/logger');
const cors = require('cors');
const healthRoute = require('./routes/healthRoute');
const aiRoute = require('./routes/aiRoute');
const { apiLimiter } = require('./middleware/rateLimiter');


app.use(helmet());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiLimiter);

app.use('/api/ai', aiRoute);
app.use('/api', proxyRoutes);
app.use('/', healthRoute);



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
