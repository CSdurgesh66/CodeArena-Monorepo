const express = require('express')
const app = express()
const { PORT } = require('./config/server.config');

app.get('/test', (req, res) => {
    res.send({
        message:"Test route"
    })
})


app.listen(PORT, () => {

    console.log(`server app listening on port ${PORT}`);

})