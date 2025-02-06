import app from "./app.js"
import { Server as WebsockerServer } from 'socket.io'
import http from 'http';
import { connect } from './db.js';
import sockets from "./sockets.js";
import { OrderFood } from "./models/OrderFood.js";

connect()


const server = http.createServer(app)

const httpServer = server.listen(3000, () => {
    console.log("Server is runnin on port 3000")
})


const io = new WebsockerServer(httpServer,{
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
})

sockets(io)

