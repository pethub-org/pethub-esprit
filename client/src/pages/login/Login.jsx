
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import Logo from '../../assets/logo.png'
import useAuth from "../../hooks/useAuth";
import axios from '../../api/axios';


const Login = () => {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  
const loginService = async({email,password}) => {
  const res = await axios.post('/auth/login', { email, password })
  setAuth(res.data)
  return res.data.role;
}

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const role = await loginService({ email, password });
      if (role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  };


  return (
    <div className="login">
      <div className="card">
        <div className="left">
         <h1>PetHub</h1>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus repudiandae praesentium illum cum, fugit corrupti? Debitis dicta, cumque quasi porro asperiores sint aliquid labore dolorem quo quis ea dolore nam!</p>
          <span> Don't you have an account ?</span>
          <Link to="/register">
          <button> Register</button>
          </Link>
          
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handlerClick}>
            <input type="email" placeholder="email" required ref={email} />
            <input type="password" placeholder="Password" required minLength="6" ref={password}/>
            <Link to="/"><button>{isFetching ? "loading" :"Log In" }</button></Link>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login