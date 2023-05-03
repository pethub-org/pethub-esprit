const { Server } = require("socket.io");
const HttpServer = require("./http.server");
require("dotenv").config()

class SocketServer {
    #io;
    static getInstance() {
        if (!this.io) {
            this.io = new Server(HttpServer.getInstance(), {
                cors: {
                    origin: ['http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:5173/', 'http://localhost:5173', 'http://127.0.0.1:5174/', 'https://localhost:5173', 'https://127.0.0.1:5173', 'http://127.0.0.1:5500/', 'http://127.0.0.1:5173/']
                },
                cookie: true,
                credentials: true
            });
        }
        return this.io;
        // return SocketManager();


    }
}


module.exports = SocketServer;

// const { Server } = require("socket.io");
// const HttpServer = require("./http.server");
// require("dotenv").config();

// let socketServerPromise;
// let httpServerPromise;

// function getSocketServer() {
//     if (!socketServerPromise) {
//         socketServerPromise = new Promise((resolve) => {
//             const io = new Server(async () => await getHttpServer(), {
//                 cors: {
//                     origin: ["http://localhost:3000", "http://localhost:3001"],
//                 },
//                 cookie: true,
//                 credentials: true,
//             });
//             resolve(io);
//         });
//     }
//     return socketServerPromise;
// }

// function getHttpServer() {
//     if (!httpServerPromise) {
//         httpServerPromise = new Promise((resolve) => {
//             const httpServer = HttpServer.getInstance();
//             httpServer.listen(process.env.PORT || 8080, () => {
//                 console.log(`HTTP server listening on port ${process.env.PORT || 8080}`);
//                 resolve(httpServer);
//             });
//         });
//     }
//     return httpServerPromise;
// }

// module.exports = {
//     getSocketServer,
//     getHttpServer,
// };
