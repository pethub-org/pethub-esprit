import React ,{useContext,useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Sidebar from './Sidebar'
import Content from './Content'
import axios from 'axios'

// import './bootstrap/css/bootstrap.min.css';
const BASE_URl = 'http://localhost:8080'

const Admin = () => {
     const [users, setUsers] = useState([]);

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
    if (currentUser.role !== 'admin') {
        navigate('/login')
    }
    }, [currentUser.role, navigate])
    
  

  const fecthUsers = async () => {
  const response = await axios.get(`${BASE_URl}/users`)
  setUsers(response.data);
  }

  useEffect(() => { 
     if (currentUser.role !== 'admin') {
      navigate('/login')
    }
      fecthUsers();
  }, [])
  return (
    <div>
   
      <Sidebar />
      <Content users={users} setUsers={setUsers}/>
        
        </div>
  )
}

export default Admin