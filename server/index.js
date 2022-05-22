const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } =require("socket.io")
const app = express();

const server= http.createServer(app);
app.use(cors())

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"]
    }
})

io.on("connection",  (socket)=> {
      console.log(`User Connected : ${socket.id}`)
       socket.on("send_message", (data) => {
           socket.to(data.roomId).emit("receive_message", data)
       })
      socket.on("join_group", (data)=> {
          socket.join(data)
          console.log(`user with ID ${socket.id} Joined room ${data}`)
      })

      socket.on("disconnect",  ()=> {
          console.log("user disconnected", socket.id)
      })
})



server.listen('3001', () => {
    console.log('Running server on port 3001')
})