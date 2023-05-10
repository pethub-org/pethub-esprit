import React from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';


const Sidebar = () => {
  const navigate = useNavigate(); 
  const {setAuth} = useAuth();
  const logout = async () => {
    await axios.post(`/auth/logout`).then((res) => console.log({ res }))
    setAuth({})
    localStorage.removeItem('user');
    navigate('/login')
}
  return (
  //    <div className="sidebar">
  //   <div className="logo-details">
  //     <i className='bx bxl-c-plus-plus'></i>
  //     <span className="logo_name">PetHub</span>
  //   </div>
  //     <ul className="nav-links">
  //       <li>
  //         <Link to="/admin" className="active">
  //           <i className='bx bx-grid-alt' ></i>
  //           <span className="links_name">Users</span>
  //         </Link>
  //       </li>
      
   
  //       <li className="log_out">
  //         <div>
  //           <i className='bx bx-log-out'></i>
  //           <span className="links_name" onClick={logout}>Log out</span>
  //         </div>
  //       </li>
  //     </ul>
  // </div>
    <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#fff',height:'60px'}}>
      <h1 style={{marginRight:'1100px'}}>PetHub</h1>
          <Link to="/admin" className="active">
           <button>Users</button>
      </Link>
       <div>
             <button onClick={logout}>Log out</button>
      </div>

    </div>
  )
}

export default Sidebar