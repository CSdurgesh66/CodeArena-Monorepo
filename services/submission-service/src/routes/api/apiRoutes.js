async function apiPlugin(fastify, options) {
    fastify.register(require('./v1/index'), {prefix: '/v1'});
}

module.exports = apiPlugin;