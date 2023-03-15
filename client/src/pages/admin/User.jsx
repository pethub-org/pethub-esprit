import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPen,faBan,faCheck } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const editAccount = () => {
    toast.info('Account Edited !', {
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
const banAccount = () => {
        toast.error('Account banned !', {
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
const deleteAccount = () => { 
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
}

 const confirmAccount =  () => {
            toast.success('Account confirmed !', {
            position: toast.POSITION.TOP_RIGHT
        });
}
    
const User = ({ user }) => {
   

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