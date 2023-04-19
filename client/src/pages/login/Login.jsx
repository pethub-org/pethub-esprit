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
          <div style={{
            margin: 'auto'
          }}>
            <img src={Logo} alt="logo" style={{
            width: 100,
            borderRadius: 25
            
          }} />
          </div>
          <h1>PetHub</h1>
            
          <h2>With PetHub, share and stay in touch with those around you.</h2>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)}  value={email}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            {error.length > 0 &&<p className="error"> {error} </p>}
            <button onClick={handleLogin}>Login</button>
          </form>
            <Link to="/reset-password">Forgot Password?</Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
