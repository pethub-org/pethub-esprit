import React ,{useContext,useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Content from './Content'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

// import './bootstrap/css/bootstrap.min.css';

const Admin = () => {
     const [users, setUsers] = useState([]);
    const {auth,setAuth } = useAuth()
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
    if (auth.role !== 'admin') {
        navigate('/login')
    }
    }, [auth.role, navigate])
    
  

  const fecthUsers = async () => {
  const response = await axiosPrivate.get(`/users`, {
                // role:'admin',
                // withCredentials:true
  })
    console.log({response})
    setUsers(response.data);
  }

  useEffect(() => { 
     if (auth.role !== 'admin') {
      navigate('/login')
    }
      fecthUsers();
  }, [])
  return (
    <div style={{backgroundColor:'#fff',width:'100vw',height:'100vh'}}>
   
      <Sidebar />
      <Content users={users} setUsers={setUsers}/>
        
        </div>
  )
}

export default Admin