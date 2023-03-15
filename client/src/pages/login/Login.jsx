import { useContext, useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const SITE_KEY = '6LeJ9_8kAAAAAAScC7C2MVw9GFoprdscmW9iNLOS';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  ///recaptcha
  const  {recaptchaValue,setRecaptchaValue} = useState('');
  const onChange = value =>{
    setRecaptchaValue(value)
  }

  const handleLogin = () => {
    login();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      login({ email, password });
      navigate('/')
    } catch (error) {
      
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <img src="../../assets/1.png" alt="logo" />
          <h1>PetHub</h1>
          <p>
            
<h2>With PetHub, share and stay in touch with those around you.</h2>
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)}  value={email}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}  value={password}/>
            <button onClick={handleLogin}>Login</button>
          </form>
          <div className="form-groupe mt-5 ">
              <ReCAPTCHA 
                 sitekey={SITE_KEY}
                 onChange={onChange}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
