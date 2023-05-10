import React,{useContext, useState}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPen,faBan,faCheck,faUserTie } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


    
const User = ({ users ,setUsers,user}) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const axios = useAxiosPrivate();

    const editAccount = () => {
        navigate(`/admin/update/user/${user._id}`)
    }

    const upgradeToAdmin = async () => {
        try {
            const response = await axios.put(`/users/update/role/${user._id}`, {
                role:'admin'
            })

        if (response.status === 200)
        {
            const filteredUsers = users.filter(u =>u._id !== user._id)
            setUsers([...filteredUsers, {
                ...user,
                role:'admin'
            }])
            
            toast.success(`Account is now ${user.email} Admin ! `, {
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
            toast.error(`Something went wrong while changing ${user.email} to admin !`, {
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

        } catch (error) {
            console.log({ error })
        toast.error(`Something went wrong while changing ${user.email} to admin !`, {
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
    
    
const banAccount = async () => {
    const response = await axios.put(`/users/ban/${user._id}`,{})
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
    
    const response = await axios.delete(`/users/${user._id}`,{})
  
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
     const response = await axios.put(`/users/admin/confirm/${user._id}`,{});
            
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
            <td style={{
                color: user.role === 'admin' ? 'blue': 'green'
            }}>
               <strong> {user?.role}</strong>
            </td>
            <td >{user.ban ? 'Yes' : 'No'}</td>
            <td >{user.accountConfirmed ? 'Yes' : 'No'}</td>
            <td >
                <div>
                    {/* <div className='d-flex'> */}
                <ToastContainer />

                <button className="btn btn-success btn-sm" style={{marginRight:'12px'}}  onClick={confirmAccount}><FontAwesomeIcon icon={faCheck} /></button>
                <button className="btn btn-primary btn-sm" style={{marginRight:'12px'}} onClick={editAccount}><FontAwesomeIcon icon={faPen} /></button>
                <button className="btn btn-danger btn-sm" style={{marginRight:'12px'}} onClick={deleteAccount}><FontAwesomeIcon icon={faTrash} /></button>
                    <button className="btn btn-danger btn-sm" style={{ marginRight: '12px' }} onClick={banAccount} ><FontAwesomeIcon icon={faBan}/></button>
                    
                <button className="btn btn-primary btn-sm" style={{marginRight:'12px'}} onClick={upgradeToAdmin}><FontAwesomeIcon icon={faUserTie}/></button>
                    
                    
                </div>
            </td>
        </tr>
    )
}

export default User