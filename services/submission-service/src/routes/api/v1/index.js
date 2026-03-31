async function v1Plugins(fastify,options) {
    fastify.register(require('./submissionRoutes'),{prefix:'/submissions'});
}

module.exports = v1Plugins;