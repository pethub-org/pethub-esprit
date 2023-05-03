const LoggedInUsers = require("./utils/users.socket")
const SocketServer = require("./utils/socket.server");
const HttpServer = require("./utils/http.server");
const connectDB = require('./configs/db.config')


require('dotenv').config()
const PORT = process.env.PORT || 8080


const server = HttpServer.getInstance();


server.listen(PORT, async () => {
    connectDB(PORT);
})

let io = SocketServer.getInstance();
// const io = await getSocketServer();
let loggedInUsers = LoggedInUsers.getInstance();

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.", socket.id);

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        console.log({ userId })
        loggedInUsers.addUser(userId, socket.id);
        console.log(loggedInUsers.getUsers())

        io.emit("getUsers", loggedInUsers.getUsers());
    });
    //send and get message
    // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    //     const user = loggedInUsers.getUser(receiverId);
    //     io.to(user.socketId).emit("getMessage", {
    //         senderId,
    //         text,
    //     });
    // });
    // const socket =io.sockets.sockets[socket.id]
    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        loggedInUsers.removeUser(socket.id);
        console.log(loggedInUsers.getUsers())
        io.emit("getUsers", loggedInUsers.getUsers());
    });
});
