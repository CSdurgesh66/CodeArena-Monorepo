const Fastify = require('fastify');
const { PORT } = require('./config/serverConfig');

const dbConnect = require('./config/dbConfig');

const fastify = Fastify({
  logger: true
})


async function startServer() {
  try {

    await dbConnect();

    await fastify.register(require('./app'));
    await fastify.listen({ port: PORT });

    console.log(`Server running on port ${PORT}`);


  } catch (err) {

    fastify.log.error(err);
    process.exit(1);

  }
}

startServer();


fastify.get('/', function (request, reply) {
  reply.send({ message: 'test route' })
})
