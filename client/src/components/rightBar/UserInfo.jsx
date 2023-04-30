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
    const conversation =conversations.find(el => el?.members?.find(id => id === userInfo?._id))
      console.log({ conversation })
      const currentPhoto = userInfo.photos.find(photo => photo.isMain);
      setChatData({...userInfo,conversationId:conversation?._id,currentPhoto})
      setShowChatBox(prev => !prev)
    }}>
            <div className={styles.userInfo}>
               <div>
                <img className={styles.img}
                      // src={userInfo?.photos?.length > 0 ? userInfo?.currentPhoto?.url : defaultImg}
                      src={userInfo?.currentPhoto ? userInfo?.currentPhoto?.url : defaultImg }
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