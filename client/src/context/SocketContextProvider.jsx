import { createContext, useEffect } from 'react'
import { io } from "socket.io-client";




const socket = io("http://localhost:8080", {
    autoConnect: true
});





export const SocketContext = createContext({ socket });


const SocketContextProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log({user})
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
            socket.emit('addUser',{userId:user._id})
        });

        return () => {
            socket.disconnect();
        }
    }, [])
    return (
        <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
    )
}

export default SocketContextProvider