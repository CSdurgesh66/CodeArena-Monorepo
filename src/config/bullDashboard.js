const fp = require("fastify-plugin");
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
// const { ExpressAdapter } =  require("@bull-board/express");
const { FastifyAdapter } = require("@bull-board/fastify");

const submissionQueue = require("../queues/submissionQueue");


async function bullDashBoard(fastify, options) {
    const serverAdapter = new FastifyAdapter();

    // serverAdapter.setBasePath("/ui");
    createBullBoard({
        queues: [
            new BullMQAdapter(submissionQueue)
        ],
        serverAdapter
    });

    await fastify.register(serverAdapter.registerPlugin(), {
        prefix: "/ui"
    });

}

module.exports = fp(bullDashBoard);
