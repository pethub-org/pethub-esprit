import React, { useContext } from 'react'
import { SocketContext } from '../context/SocketContextProvider';

const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocketContext must be used within a SocketContextProvider')
    }

    return context;

}

export default useSocketContext