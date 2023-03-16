import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./resetPassword.scss";


const BASE_URL = 'http://localhost:8080';

const ResetPassword = () => {
  const [email,setEmail] = useState('')
  const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BASE_URL}/users/email/reset-password`, { email })
            setError(false)
            setSuccess(true)
            console.log({response})
        } catch (error) {
            setSuccess(false);
            setError(true)
        }
    } 
  return (
     <div className="register">
      <div className="card">
        <div className="left">
          <h1>PetHub</h1>
          <h2>With PetHub, share and stay in touch with those around you.</h2>
          <span>Do you have an account?</span>
          {/* <Link to="/login">
          <button>Login</button>
          </Link> */}
        </div>
        <div className="right">
          <h1>Reset Password</h1>
          <form>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            
            {error && <p className="error"> {error}</p>}
            {success && <p>Please Check Your Email ! !</p>}
            <button onClick={handleResetPassword}>Reset Password</button>
          </form>
          <Link to="/login">Login ?</Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword