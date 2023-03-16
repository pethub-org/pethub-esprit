import React,{useContext, useState}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPen,faBan,faCheck } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080'

    
const User = ({ users ,setUsers,user}) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const editAccount = () => {
        navigate(`/admin/update/user/${user._id}`)
    }
    
    
const banAccount = async () => {
    const response = await axios.put(`${BASE_URL}/users/ban/${user._id}`,{},
        {
            headers: {
            'Authorization':`Bearer ${currentUser.token}`
            }
        }
        
    )
    if (response.status === 200)
    {
        const filteredUsers = users.filter(u =>u._id !== user._id)
        setUsers([...filteredUsers, {
            ...user,
            ban:true
        }])
        
        toast.error(`Account is now ${user.email} banned ! `, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
 
    } else {
        toast.error(`Something went wrong while banning ${user.email} !`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    }
    
}
    const deleteAccount = async () => { 
    
    const response = await axios.delete(`${BASE_URL}/users/${user._id}`,{},
        {
            headers: {
            'Authorization':`Bearer ${currentUser.token}`
            }
        }
        
    )
  
        if (response.status === 200) {
         const filteredUsers = users.filter(u =>u._id !== user._id)
        setUsers([...filteredUsers])
        toast.error('Account deleted !', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
          toast.error('Something went wrong !', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
}

    const confirmAccount =async () => {
     const response = await axios.put(`${BASE_URL}/users/admin/confirm/${user._id}`,{},
        {
            headers: {
            'Authorization':`Bearer ${currentUser.token}`
            }
        });
            
        if (response.status === 200) {
             const filteredUsers = users.filter(u =>u._id !== user._id)
            setUsers([...filteredUsers, {
            ...user,
            accountConfirmed:true
            }])
            toast.success('Account confirmed !', {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        else {
            toast.error('Something went wrong !', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
}
    return (
        <tr>
            <td >{user?.email}</td>
            <td >{user?.firstname}</td>
            <td >{user?.lastname}</td>
            <td >{user?.role}</td>
            <td >{user.ban ? 'true' : 'false'}</td>
            <td >{user.accountConfirmed ? 'true' : 'false'}</td>
            <td >
                <div>
                    {/* <div className='d-flex'> */}
                <ToastContainer />

                <button className="btn btn-success btn-sm" style={{marginRight:'12px'}}><FontAwesomeIcon icon={faCheck} onClick={confirmAccount} /></button>
                <button className="btn btn-primary btn-sm" style={{marginRight:'12px'}}><FontAwesomeIcon icon={faPen} onClick={editAccount}/></button>
                <button className="btn btn-danger btn-sm" style={{marginRight:'12px'}}><FontAwesomeIcon icon={faTrash} onClick={deleteAccount}/></button>
                <button className="btn btn-danger btn-sm" style={{marginRight:'12px'}}><FontAwesomeIcon icon={faBan} onClick={banAccount}/></button>
                    
                    
                </div>
            </td>
        </tr>
    )
}

export default User