import React from 'react'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import styles from './button.module.css';

const   Button = ({ type, setButtonType,user ,friendRequest}) => {
    const { auth, setAuth } = useAuth();
    const handleAdd = async () => {
        axiosPrivate.put(`/users/add-friend/${user._id}`, {}).then(resposne => {
            console.log('add request sent successfully')
            setButtonType('delete-button')
        })
        // await refreshLoggedInUser();

    }
    const  handleDelete = async () => {
        const res = axiosPrivate.delete(`/users/delete-friend/${user._id}`, {});
          setButtonType('add-button')
            setAuth(prev => {
                return {
                    ...prev,
                    friendList: prev.friendList.filter(friend => friend._id !== user._id)
                }
            })

    }
    const handleAccept = async () => {
        // console.log({friendRequest})
        const friendData = await axiosPrivate.get(`/users/${user._id}`);
        // console.log({friendData})
        await axiosPrivate.put(`/users/accept-friend/${friendRequest._id}`)
        // setButtonType('friends')
        setButtonType('delete-button')
              setAuth(prev => {
                return {
                    ...prev,
                    friendList:[...prev.friendList,friendData.data.user]
                }
            })
        
    }
    const handleDecline = async () => {

        axiosPrivate.put(`/users/decline-friend-request/${friendRequest._id}`, {}).then(resposne => {
        console.log('decline friend request request sent successfully')
            setButtonType('add-button')
        })
        // await refreshLoggedInUser();
        
    }


      if (type === 'add-button') {
        return <button className={styles.addButton}  onClick={handleAdd}>Add</button>
    }
    if (type === 'delete-button') {
        return <button className={styles.declineButton}  onClick={handleDelete}>Delete</button>
    }
    if (type === 'accept-decline-button') {
        return <>
            <div style={{ display: 'flex' }}>
                <div >
                    <button style={{ width:'80%'}} className={styles.acceptButton} onClick={handleAccept}>Accept</button>
                </div>
                <div>
                    <button style={{ width:'80%'}}className={styles.declineButton} onClick={handleDecline}>Decline</button>

                </div>

            </div>
        </>
    }
    return <>
        <p>friends</p>
    </>
}

export default Button