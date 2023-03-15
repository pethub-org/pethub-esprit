import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/')
    } catch (error) {
      console.log({error})
      setError(error.message)
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <img src="../../assets/1.png" alt="logo" />
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
        </div>
      </div>
    </div>
  );
};

export default Login;
