const fastifyPlugin = require('fastify-plugin');


const bullmqdashboard = require('./config/bullDashboard');
const apiRoutes = require('./routes/api/apiRoutes');
const servicePlugin = require('./services/servicePlugin');
const repositoryPlugin = require('./repository/repositoryPlugin');



/**
 * 
 * @param {Fastify object} fastify 
 * @param {*} options 
 */


async function app(fastify,options) {



    fastify.register(require('@fastify/cors'));


    fastify.register(repositoryPlugin);
    fastify.register(servicePlugin);

    await fastify.register(bullmqdashboard);
    await fastify.register(apiRoutes,{prefix:'/api'});

    
}

module.exports = fastifyPlugin(app);