import React ,{useContext,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Sidebar from './Sidebar'
import Content from './Content'

// import './bootstrap/css/bootstrap.min.css';

const Admin = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
    if (currentUser.role !== 'admin') {
        navigate('/login')
    }
    }, [currentUser.role, navigate])
    
  return (
    <div>
   
      <Sidebar />
      <Content/>
        
        </div>
  )
}

export default Admin