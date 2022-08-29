const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').createServer(app)
const socketIo = require('socket.io')
const mongoose = require("mongoose");
const session = require("express-session")
const io = socketIo(http, {cors: {origin: "http://localhost:3000"}})
require("dotenv").config()

mongoose.connect(process.env.MONGODB_KEY)
    .then(res => {
        console.log("connected")
    }).catch(e => {
    console.log(e)
})

http.listen(4000, () => {
    console.log("Server is running")
})

app.use(cors({origin: "http://localhost:3000", credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE"}))
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
)
app.use(express.json())

const router = require("./router/mainRouter")
app.use("/", router)
let users = []
app.set('socket', io)

io.on("connect", (socket) => {
    socket.on("addUser", (user) => {
        const currentUser = {
            id: socket.id,
            name: user,
            city: user,
            gender: user,
            age: user
        }
        users.push(currentUser)
    })
    socket.on("disconnect", () => {
        users = users.filter(x => x.id !== socket.id)
    })
})
