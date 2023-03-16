import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./resetPasswordForm.scss";



const BASE_URL = 'http://localhost:8080';

const ResetPasswordForm = () => {
    const { token } = useParams();
  const [password,setPassword] = useState('')
    const [confirmPassword, setCnfirmPassword] = useState('')
    
  const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const changePassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BASE_URL}/users/reset-password`, { password,confirmPassword,token })
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
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Reset Password</h1>
          <form>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" onChange={(e) => setCnfirmPassword(e.target.value)} />
            
            {error && <p className="error"> {error}</p>}
            {success && <p> Password Updated successfully !</p>}
            <button onClick={changePassword}>Change Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm