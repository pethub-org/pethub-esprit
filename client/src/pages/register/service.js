import axios from 'axios'
const userService ={}

userService.register = function(data){
    //appel api
    return axios.post('http://localhost:3000/api/auth/register', data) 
}

export default userService;