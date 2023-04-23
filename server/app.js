const express = require("express");
const path = require("path")
const connectDB = require('./configs/db.config')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const { createServer } = require("http");
require('dotenv').config()
const PORT = process.env.PORT || 8080

const errorHandler = require("./middlewares/error.middleware");

// const userModel = require("./models/UserSchema")

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const eventsRouter = require("./routes/event.routes");
const notificationsRouter = require("./routes/notification.routes");
const conversationRouter = require("./routes/conversation.routes");
const messagesRouter = require("./routes/message.routes");

const commentRoute = require("./routes/comment");
const postRoute = require("./routes/post");

const reviewroute = require("./routes/reviewRoute");
const prodroute = require("./routes/productRoute");
const catroute = require("./routes/categoryRoute");



const { Server } = require("socket.io");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());


// Middlewares
app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use("/uploads", express.static("uploads"));


app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
}))
app.use(errorHandler);

// app.use(helmet())


// Rooutes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/events', eventsRouter);
app.use('/notifications', notificationsRouter);
app.use('/conversations', conversationRouter);
app.use('/messages', messagesRouter);

// anis
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// app.use("/api/users/:id", async (req, res) => {
//     try {
//         const user = await userModel.findById(req.params.id)
//         res.status(200).json(user)
//     }
//     catch (err) {
//         return res.status(500).json(err)
//     }
// });


// daly
app.use("/api/reviews", reviewroute);
app.use("/api/products", prodroute);
app.use("/api/categorie", catroute);

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5173/', 'http://localhost:5173', 'http://127.0.0.1:5174/', 'https://localhost:5173', 'https://127.0.0.1:5173', 'http://127.0.0.1:5500/', 'http://127.0.0.1:5173/']
    },
    cookie: true,
    credentials: true
});


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.", socket.id);
    console.log({ users })

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        console.log({ userId })
        addUser(userId, socket.id);
        console.log({ users })

        io.emit("getUsers", users);
    });

    //send and get message
    // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    //     const user = getUser(receiverId);
    //     io.to(user.socketId).emit("getMessage", {
    //         senderId,
    //         text,
    //     });
    // });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        console.log({ users })
        io.emit("getUsers", users);
    });
});



server.listen(PORT, () => {
    connectDB(PORT);
})


module.exports = io;
