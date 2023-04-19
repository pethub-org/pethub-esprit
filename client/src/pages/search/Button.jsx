import React from 'react'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
// import useAuthContext from '../../hooks/useAuth'

// const URL = 'http://localhost:8080'

const Button = ({ type, setButtonType,user }) => {
    const {auth,setAuth} = useAuth();
    const handleAdd = async () => {
        axiosPrivate.put(`/users/add-friend/${user._id}`, {}).then(resposne => {
            console.log('add request sent successfully')
            setButtonType('delete-button')
        })
        // await refreshLoggedInUser();

    }
    const handleDelete = async () => {

        axiosPrivate.delete(`/users/delete-friend/${user._id}`, {}).then(resposne => {
            console.log('delete request sent successfully')
            setButtonType('add-button')
        }).catch((err) => console.log(auth.token))

        // await refreshLoggedInUser();

    }
    const handleAccept = async () => {
        axiosPrivate.put(`${URL}/users/accept-friend/${user._id}`, {}).then(resposne => {
        console.log('accept friend request request sent successfully')
            setButtonType('friends')
      })
        // await refreshLoggedInUser();
        
    }
    const handleDecline = async () => {

        axiosPrivate.put(`/users/decline-friend-request/${user._id}`, {}).then(resposne => {
        console.log('decline friend request request sent successfully')
        setButtonType('add-button')
        })
        // await refreshLoggedInUser();
        
    }


      if (type === 'add-button') {
        return <button onClick={handleAdd}>add</button>
    }
    if (type === 'delete-button') {
        return <button onClick={handleDelete}>delete</button>
    }
    if (type === 'accept-decline-button') {
        return <>
            <button onClick={handleAccept}>accept</button>
            <button onClick={handleDecline}>decline</button>
        </>
    }
    return <>
        <p>friends</p>
    </>
}

export default Button