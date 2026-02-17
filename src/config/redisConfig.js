const Redis = require("ioredis");

const serverConfig = require("./serverConfig");

const redisConfig = {
    port:serverConfig.REDIS_PORT,
    host:serverConfig.REDIS_HOST,
    maxRetriesPerRequest :null
}


const redisConnection = new Redis(redisConfig);

redisConnection.on("connect", () => {
    console.log("Connected to redis with ioredis");
});

redisConnection.on("error", (err) => {
    console.log("Redis error:",err);
});


module.exports =  redisConnection;