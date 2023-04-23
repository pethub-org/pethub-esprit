import React, { useEffect } from 'react'
import styles from './userInfo.module.css';
import defaultImg from '../../assets/defaultUser.png'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';




const UserInfo = ({ setShowChatBox, userInfo, setChatData,setMessages,conversations,setConversations }) => {
  const {auth} = useAuth();
 
  // useEffect(() => {
  //   console.log({conversations})
  //   // const res = axiosPrivate.get(`/conversations/${auth._id}/${userInfo._id}`).then(response => {
  //     // console.log(response.data._id)
  //   const conversationId =conversations.find(el => el.members.find(id => id === userInfo._id))
  //     console.log({conversationId})
  //     const url = `/messages/conversation/${conversationId}`
  //     axiosPrivate.get(`${url}`).then(response => {
  //       setMessages(response.data)
  //         console.log({response})
  //     })
  //   // })
  //   },[auth._id,userInfo._id])

 

  return (
    <div style={{marginTop:'8px'}} className={styles.user} onClick={() => {
    const conversation =conversations.find(el => el.members.find(id => id === userInfo._id))
      console.log({ conversation })
      
      setChatData({...userInfo,conversationId:conversation._id})
      setShowChatBox(prev => !prev)
    }}>
            <div className={styles.userInfo}>
               <div>
                <img className={styles.img}
                      src={userInfo?.photos?.length <1 ? defaultImg : userInfo?.photos[0].url}
                      alt=""
                    />
              </div>
              {/* <div className={styles.online} /> */}
              <p className={styles.name}>{userInfo?.firstname} {' '} { userInfo?.lastname}</p>
            </div>
            
    </div>
  )
}

export default UserInfo