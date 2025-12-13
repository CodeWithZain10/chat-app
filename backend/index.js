import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin: "*"
    }
})

const ROOM = 'group'

io.on("connection", (socket)=>{
    console.log("User Connected", socket.id)

    socket.on("joinRoom", async (userName) => {
        console.log(`${userName} is join the group`)

        await socket.join(ROOM)

        // io.to(ROOM).emit("roomNotify", userName)
        socket.to(ROOM).emit("roomNotify", userName)
    })

    socket.on("messages", (msg)=> {
        socket.to(ROOM).emit("messages", msg)
    })

    socket.on("typing", (userName)=> {
        socket.to(ROOM).emit("typing", userName)
    })

    socket.on("stopTyping", (userName)=> {
        socket.to(ROOM).emit("stopTyping", userName)
    })
})

server.listen(4000, () => {
    console.log('running')
})