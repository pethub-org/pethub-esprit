import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./resetPassword.scss";
import axios from '../../api/axios';
import { ToastContainer,toast } from 'react-toastify';


const ResetPassword = () => {
  const [email,setEmail] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
    
    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
          setIsLoading(true)
          if (!email.trim() || !email.trim().includes('@') || !email.trim().includes('.')) {
               toast.error('Invalid Email.', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
               });
            return;
          }

            const response = await axios.post(`/users/email/reset-password`, { email })
            setError(false)
          setSuccess(true)
            toast.success('Please Check Your Email!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });
          
            console.log({response})
        } catch (error) {
            setSuccess(false);
          setError(true)
            toast.error('Something went wrong.', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
            });
          setIsLoading(false)
        } finally {
          setIsLoading(false)
        }
    } 
  return (
     <div className="register">
      <div className="card">
        <div className="left">
          <h1>PetHub</h1>
          <h2>With PetHub, share and stay in touch with those around you.</h2>
          <span>Do you have an account?</span>
        </div>
        <div className="right">
          <h1>Reset Password</h1>
          <form>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            
            {error && <p className="error"> {error}</p>}
            {success && <p style={{color:'red',fontWeight:'bold'}}>Please Check Your Email ! !</p>}
            <button onClick={handleResetPassword} disabled={isLoading}>Reset Password</button>
          </form>
          <Link to="/login">Login ?</Link>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ResetPassword