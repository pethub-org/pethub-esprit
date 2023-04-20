import axios from 'axios'
export const loginCall= async(userCredentials,dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try{
        const res= await axios("/auth/login",userCredentials)
        dispatch({type:"Login_Success",payload:res.data})
    }
    catch(err){
        dispatch({type:"Login_Failure",payload:err})

    }
}