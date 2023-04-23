import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error('AuthContext must wrapped inside a provider')
    }
    return context;
}

export default useAuth