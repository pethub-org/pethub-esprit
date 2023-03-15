import React from 'react'
import './style.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080'

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    axios.post(`${BASE_URL}/auth/logout`).then((res) => console.log({ res }))
    localStorage.removeItem('user');
    navigate('/login')
}
  return (
     <div className="sidebar">
    <div className="logo-details">
      <i className='bx bxl-c-plus-plus'></i>
      <span className="logo_name">PetHub</span>
    </div>
      <ul className="nav-links">
        <li>
          <Link to="/admin" className="active">
            <i className='bx bx-grid-alt' ></i>
            <span className="links_name">Users</span>
          </Link>
        </li>
   
        <li className="log_out">
          <div>
            <i className='bx bx-log-out'></i>
            <span className="links_name" onClick={logout}>Log out</span>
          </div>
        </li>
      </ul>
  </div>
  )
}

export default Sidebar