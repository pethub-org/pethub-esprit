import axios from '../api/axios';
import useAuth from './useAuth';
import useAuthContext from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuthContext();

    const refresh = async () => {
        const response = await axios.post('/auth/refresh-token', {
            // withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
