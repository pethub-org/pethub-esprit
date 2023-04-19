import "./register.scss"
import {Link} from 'react-router-dom'
import { useState } from "react"
import userService from "./service"

const Register = () => {
  const [username, setUsername]=useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [date ,setDate]=useState('');
  const [errors,setErrors] = useState(
    {
        username : '',
        email:'',
        password:'',
        date: '',
    }
)
    //test des champs vide ou non
    const formValidation = ()=>{
      let status = true;
      let localerror = 
      {...errors }
      if (username==""){
          localerror.username = 'username required';
          status = false;
      }
      if (email==""){
          localerror.email = 'email required';
          status = false;
      }
      if (password==""||password.length < 8  ){
          localerror.password = 'password required';
          status = false;
      }
      if (date==""){
          localerror.date = 'birthdate required';
          status = false;
      }
      setErrors(localerror)
      //console.log(localerror)
      return status;  

  }
  const register = async(e)=>{
    //no reload
    e.preventDefault()
    console.log("form submitted")
    console.log("form data :" , username,email ,password,  date )
    if (formValidation()){ //form valide
        const data = {
          username:username,
            email: email ,
            password:password,
            date: date,
            
        }
        try{
            const res = await userService.register(data)
            console.log("response ====>",res)
            setUsername('')
            setEmail('')
            setPassword('')
            setDate('')
           

        }catch(error){
             console.log(error)
             

        }

    }
    else {
        console.log("form invalid")
    }

}
  return (
    <div className="register">
      <div className="card">
        <div className="left">
         <h1>Hello World</h1>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus repudiandae praesentium illum cum, fugit corrupti? Debitis dicta, cumque quasi porro asperiores sint aliquid labore dolorem quo quis ea dolore nam!</p>
          <span> Do you have an account ?</span>
          <Link to="/login">
          <button> Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)}/>
            <input type="email" placeholder="Email"
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}/>
            <input type="date" placeholder="BirthDate" style={{color:"gray"}}
            value={date} 
            onChange={(e)=>setDate(e.target.value)}/>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register