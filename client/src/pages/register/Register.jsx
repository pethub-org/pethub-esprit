import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "../../api/axios";
import {ToastContainer,toast} from 'react-toastify'

const Register = () => {
  const [email,setEmail] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError('');
    setSuccess(false);

    try {
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

        if (!firstname.trim()  ) {
            toast.error('Firstname can not be emmpty!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });
        return;
      }
        if (!lastname.trim()  ) {
            toast.error('Lastname can not be emmpty!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });
        return;
      }
        if (!password.trim()  ) {
            toast.error('password can not be emmpty!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });
        return;
      }
        if (!confirmPassword.trim()  ) {
            toast.error('password can not be emmpty!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });
        return;
      }
        if (confirmPassword.trim() !== password.trim()) {
            toast.error('password and confirm password must match!', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });
        return;
      }


      const response = await axios.post(`/users`, { email, firstname, lastname, password, confirmPassword })
      // console.log("sucess => ", { response })
        toast.success('Please Confirm.Your account an email has been sent', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });
      if (response.status === 201) {
        setSuccess(true)
        setIsLoading(false)

      }
    } catch (error) {
      console.log({error})
      setError(error.response.data.message || error.response.data.error[0]);
      setIsLoading(false)
          toast.error('Something went wrong.', {
              position: "top-right",
              autoClose: 1000,
              closeOnClick: true,
              progress: undefined,
              theme: "dark",
              });

    } finally{
      setIsLoading(false)

    }
    
  }

  return (
    <div className="register" style={{backgroundColor:"rgb(236, 236, 236)"}}>
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
            <button onClick={handleRegister} disabled={isLoading}>Register</button>
            <Link to="/reset-password">Forgot Password?</Link>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
