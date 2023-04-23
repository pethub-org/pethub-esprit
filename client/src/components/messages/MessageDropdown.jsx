import React, { useEffect, useState } from 'react'
import styles from './message.module.css';
import PorfilePicture from '../../assets/defaultUser.png'
import Conversation from './Conversation';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const MessageDropdown = () => {
    const [showMessages, setShowMessages] = useState(false);
    const [conversations, setConversations] = useState([]);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(() => {
        axiosPrivate.get(`/conversations/${auth._id}`)
            .then(response => setConversations(response.data.conversation))
    }, [])
    
    let content;
    const latestTexts = conversations?.map(text => {

    })
    if (showMessages) { 
        content = <>
            <div className={styles.container}>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
               <Conversation/>
          
               
               <button style={{alignSelf:'flex-end'}} onClick={() => setShowMessages(false)}> x</button>
            </div>
        </>
    }
  return (
      <div style={{
          marginTop:'16px'
      }}>
          <button onClick={() => setShowMessages(prev => !prev)}>Messages</button>
             {content}
    </div>
  )
}

export default MessageDropdown   