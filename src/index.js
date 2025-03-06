import app from "./app.js"
import { Server as WebsockerServer } from 'socket.io'
import './config.js'
import http from 'http';
import { connect } from './db.js';
import sockets from "./sockets.js";

connect()


const server = http.createServer(app)
const PORT = process.env.PORT || 3000;
const httpServer = server.listen(PORT, () => {
    console.log(`Server is runnin on port ${PORT}`)
})


const io = new WebsockerServer(httpServer,{
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
})

sockets(io)

