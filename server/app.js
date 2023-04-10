const express = require("express");
const connectDB = require('./configs/db.config')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const { createServer } = require("http");
require('dotenv').config()
const PORT = process.env.PORT || 8080

const errorHandler = require("./middlewares/error.middleware");

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const eventsRouter = require("./routes/event.routes");
const notificationsRouter = require("./routes/notification.routes");

const { Server } = require("socket.io");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());


// Middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(errorHandler);

// app.use(helmet())


// Rooutes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/events', eventsRouter);
app.use('/notifications', notificationsRouter);



const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5173/', 'http://localhost:5173', 'http://127.0.0.1:5174/', 'https://localhost:5173', 'https://127.0.0.1:5173', 'http://127.0.0.1:5500/', 'http://127.0.0.1:5173/']
    },
    cookie: true,
    credentials: true
});
// socket(io);
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('test', (data) => {
        console.log({ data })
    })


})
module.exports = io;


server.listen(PORT, () => {
    connectDB();
    console.log(`listening on port ${PORT}`);
})
