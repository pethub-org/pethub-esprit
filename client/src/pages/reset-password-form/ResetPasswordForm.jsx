import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./resetPasswordForm.scss";
import axios  from '../../api/axios';
import { ToastContainer,toast } from 'react-toastify';


const ResetPasswordForm = () => {
    const { token } = useParams();
  const [password,setPassword] = useState('')
    const [confirmPassword, setCnfirmPassword] = useState('')
    
  const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    const changePassword = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        if (!password.trim()) {
            toast.error('Password can not be empty!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
            });
          return;
        }
         if (!confirmPassword.trim()) {
            toast.error('Confirm Password can not be empty!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
            });
          return;
        }
         if (!password.trim() !== confirmPassword.trim()) {
            toast.error('Password and confirm password must match!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
            });
          return;
          }
            const response = await axios.post(`/users/reset-password`, { password,confirmPassword,token })
            setError(false)
          setSuccess(true)
          setIsLoading(false)
          toast.success('Password reseted succesfully!', {
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
            <button onClick={changePassword} disabled={isLoading}>Change Password</button>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ResetPasswordForm