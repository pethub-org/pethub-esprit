import React, { useEffect } from 'react'
import styles from './userInfo.module.css';
import defaultImg from '../../assets/defaultUser.png'
import useAuthContext from '../../hooks/useAuth';
import axios from 'axios';




const UserInfo = ({ setShowChatBox, userInfo, setChatData,setMessages }) => {
  const {currentUser} = useAuthContext();
  
  const fetchConversation = async (currentUserId,userId,token) => {
   const conversation =  axios.get(`http://localhost:8080/conversations/${currentUserId}/${userId}`,
     {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
   ).then(response => response.data)
    return conversation;
  }

  const fetchMessages = async (token,conversation) => {
      const messages = axios.get(`http://localhost:8080/messages/conversation/${conversation?._id}`,  {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }
    ).then(response => response.data)
    return messages;
  }

 
  useEffect(() => {
      const fetchAll = async(currentUserId,userId,token) => {
        const conversation = await fetchConversation(currentUserId, userId, token);
        console.log({conversation})
        const messages = await fetchMessages(conversation);
        return messages;
    }
    
    fetchAll().then(response => {
       console.log({response})
    // setMessages(messages)
     })

  },[])

  return (
    <div className={styles.user} onClick={() => {
      
      setChatData(userInfo)
      setShowChatBox(prev => !prev)
    }}>
            <div className={styles.userInfo}>
               <div>
                <img className={styles.img}
                      src={userInfo.photos.length <1 ? defaultImg : userInfo.photos[0].url}
                      alt=""
                    />
              </div>
              {/* <div className={styles.online} /> */}
              <p className={styles.name}>{userInfo.firstname} {' '} { userInfo.lastname}</p>
            </div>
            
    </div>
  )
}

export default UserInfo