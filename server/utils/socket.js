// const socketIO = require('socket.io');
// const io = require("../app")
// module.exports = (server) => {
//     // const io = socketIO(server);

//     io.on('connection', (socket) => {
//         console.log('A user has connected', socket.id);
//         socket.on('test', (data) => {
//             console.log("data recieved from client ", { data });
//         })

//         // socket.on('joinRoom', (roomId) => {
//         //     socket.join(roomId);
//         //     console.log(`User has joined room ${roomId}`);
//         // });

//         // socket.on('leaveRoom', (roomId) => {
//         //     socket.leave(roomId);
//         //     console.log(`User has left room ${roomId}`);
//         // });

//         // socket.on('sendMessage', (data) => {
//         //     io.to(data.roomId).emit('message', data);
//         //     console.log(`Message sent to room ${data.roomId}`);
//         // });

//         socket.on('disconnect', (data) => {
//             console.log('A user has disconnected', data);
//         });
//     });
// };
