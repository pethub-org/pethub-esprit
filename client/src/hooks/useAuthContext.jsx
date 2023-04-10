import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error('AuthContext must wrapped inside a provider')
    }
    return context;
}

export default useAuthContext