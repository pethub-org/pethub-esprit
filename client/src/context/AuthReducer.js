const AuthReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false,
            };
        case "Login_Success":
            return{
                user:action.payload,
                isFetching:false,
                error:false,
            }
        case "Login_Failure": 
            return{
                user:null,
                isFetching:false,
                error:action.payload,
            };
        default : 
            return state;
    

    }
};
export default AuthReducer;