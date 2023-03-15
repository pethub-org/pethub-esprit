import { useContext, useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const SITE_KEY = '6LeJ9_8kAAAAAAScC7C2MVw9GFoprdscmW9iNLOS';

const Login = () => {
  const { login } = useContext(AuthContext);

  ///recaptcha
  const  {recaptchaValue,setRecaptchaValue} = useState('');
  const onChange = value =>{
    setRecaptchaValue(value)
  }

  const handleLogin = () => {
    login();
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
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
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
