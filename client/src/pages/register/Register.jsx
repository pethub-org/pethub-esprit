import { Link } from "react-router-dom";
import "./register.scss";
import axios from 'axios';
import { useState } from "react";
const Register = () => {
  const BASE_URL = 'http://localhost:8080';
  const [email,setEmail] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(`${BASE_URL}/users`, { email, firstname, lastname, password, confirmPassword })
      console.log("sucess => ", { response })
      if (response.status === 201) {
        setSuccess(true)
      }
    } catch (error) {
      console.log({error})
      setError(error.response.data.message || error.response.data.error[0]);
    }
    
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>PetHub</h1>
          <h2>With PetHub, share and stay in touch with those around you.</h2>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)} />
            <input type="text" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm Password"  onChange={(e) => setConfirmPassword(e.target.value)}/>
            {error && <p className="error"> {error}</p>}
            {success && <p>Please confirm the registration by checking your email !</p>}
            <button onClick={handleRegister}>Register</button>
            <Link to="/reset-password">Forgot Password?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
