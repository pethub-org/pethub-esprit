import {createContext, useReducer} from 'react'
import AuthReducer  from './AuthReducer';
const INITIAL_STATE ={
    user:{
        
_id :"642428751186f81b31fde17b",
username:"anis",
email:"anis@gamil.com",
password:"12345",
profilePicture: "https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg",
coverPicture: "",
followers: [
    "6424296ac2665866fa387ee5"
],
followersPeople: [
    "6424296ac2665866fa387ee5"
],
"isAdmin": false,
    },
    isFetching: false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state , dispatch] = useReducer(AuthReducer,INITIAL_STATE);
    return(
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch}}>
      {children}
        </AuthContext.Provider>
    )
}