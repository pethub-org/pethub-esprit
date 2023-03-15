import React ,{useContext,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Admin = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
    if (currentUser.role !== 'admin') {
        navigate('/login')
    }
    }, [currentUser.role, navigate])
    
  return (
    <div>Admin page</div>
  )
}

export default Admin