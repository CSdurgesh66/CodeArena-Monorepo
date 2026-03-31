const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const Redis = require('ioredis');

const app = express();
const server = http.createServer(app);

const redisCache = new Redis();

const io = new Server(server, {
   cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on('setUserId',(userId) => {
     console.log("Setting user id to connection id", userId, socket.id);
     redisCache.set(userId,socket.id);
  });

  socket.on('getConnectionId', async(userId) => {
    const connectId = await redisCache.get(userId);
    console.log("Gettting connection id for user id",userId,connectId);
    socket.emit('connectionId',connectId);
    
  })


  socket.on('disconnect', () => {
    console.log("User disconnected ", socket.id);
  })
  
})


app.post('/sendPayload', async(req,res) => {
  console.log(req.body);
  const {userId, payload} = req.body;

  if(!userId || !payload){
    return res.status(400).send("Invalid request");
  }

  const socketId = await redisCache.get(userId);

  if(socketId){
    io.to(socketId).emit("submissionPayloadResponse",payload);
    return res.send("Payload sent successfully");
  }else {
    return res.status(404).send("User not connected");
  }
})

app.get('/', (req, res) => {
  res.send('Hello world');

});

server.listen(3002,() => {
    console.log('server is running on port:3002');
})
