import React, { useContext } from 'react'
import { SocketContext } from '../context/SocketContextProvider';

const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocketContext must be used within a SocketContextProvider')
    }

    return context;

}

export default useSocket