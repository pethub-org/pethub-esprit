import React from 'react'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import styles from './button.module.css';

const Button = ({ type, setButtonType,user }) => {
    const { auth, setAuth } = useAuth();
    const handleAdd = async () => {
        axiosPrivate.put(`/users/add-friend/${user._id}`, {}).then(resposne => {
            console.log('add request sent successfully')
            setButtonType('delete-button')
        })
        // await refreshLoggedInUser();

    }
    const  handleDelete = async () => {

        axiosPrivate.delete(`/users/delete-friend/${user._id}`, {}).then(resposne => {
            setButtonType('add-button')
            setAuth(prev => {
                return {
                    ...prev,
                    friendList:prev.friendList.filter(friend =>friend._id !== user._id)
                }
            })
        }).catch((err) => console.log({err}))

    }
    const handleAccept = async () => {
        const friendData = await axiosPrivate.get(`/users/${user._id}`);
        console.log({friendData})
        await axiosPrivate.put(`/users/accept-friend/${user._id}`)
        setButtonType('friends')
              setAuth(prev => {
                return {
                    ...prev,
                    friendList:[...prev.friendList,friendData.data]
                }
            })
        // axiosPrivate.put(`/users/accept-friend/${user._id}`, {}).then(resposne => {
        //     setButtonType('friends')
        //       setAuth(prev => {
        //         return {
        //             ...prev,
        //             friendList:[...prev.friendList,friendData.data]
        //         }
        //     })
    //   })
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
        return <button className={styles.addButton}  onClick={handleAdd}>Add</button>
    }
    if (type === 'delete-button') {
        return <button className={styles.declineButton}  onClick={handleDelete}>Delete</button>
    }
    if (type === 'accept-decline-button') {
        return <>
            <button className={styles.acceptButton} onClick={handleAccept}>Accept</button>
            <button className={styles.declineButton} onClick={handleDecline}>Decline</button>
        </>
    }
    return <>
        <p>friends</p>
    </>
}

export default Button