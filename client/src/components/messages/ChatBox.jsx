import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import UserMessage from './UserMessage'
import MyMessage from './MyMessage'
import styles from './chatbox.module.css'
import defaultImg from '../../assets/defaultUser.png' 
import useAuth from '../../hooks/useAuth'
import { axiosPrivate } from '../../api/axios'

const ChatBox = ({ chatData, setShowChatBox,messages,setMessages }) => {
    
    const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([])
    const [conversationId, setCOnversationId] = useState();
    const { auth } = useAuth();

 
    // useEffect(() => {
    //     const fetchCurrentConversation = async () => {
    //         const response = await axiosPrivate.get(`/conversations/${chatData._id}/${auth._id}`)
    //         setCOnversationId(response.data._id)
    //         return response.data;
    //     }
    //     const conversation = fetchCurrentConversation();
    //     console.log({conversation})

    //     axiosPrivate.get(`/messages/conversation/${conversation._id}`).then(response => {
    //         setMessage(response.data)
    //     })
    // }, [])
    

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log({ message })
        console.log({ chatData})
        axiosPrivate.post(`/messages`, {
            sender: auth._id,
            conversationId:chatData.conversationId,
            text:message
        }).then(response => {
            setMessages(prev => [...prev,response.data])
        })
    }
    return (
        <div className={styles.relative}>
            <div className={styles.container} >

                {/* header */}
                <div className={styles.header}>
                    <img src={chatData.photos.length <1 ? defaultImg : chatData.photos[0].url} alt="profile picture" className={styles.img} />
                    <p>{chatData.firstname} {' '} {chatData.lastname}</p>
                    <div style={{cursor:'pointer'}} onClick={() => setShowChatBox(prev => !prev)}>X</div>
                </div>

                {/* message content */}
                <div className={styles.messageContent}>
                    <div style={{height:'80%'}}>
                         {messages?.length > 0 ? messages?.map(message => {
                        if (message.sender === auth._id) {
                            return <MyMessage message={message.text} key={message._id}/>
                        } else {
                            return <UserMessage message={message.text} key={message._id}/>
                        }
                    }) : <p style={{marginLeft:'16px',marginTop:'4px'}}>No messages yet</p>}
                   </div>

                    
                     <div className={styles.footer}>
                    <div className={styles.footerContent} >

                        <input type="text" placeholder='Type here'
                            className={styles.footerInput}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} />

                        <button className={styles.footerButton} onClick={handleSendMessage}>
                            send
                            {/* <FontAwesomeIcon icon={faPaperPlane} className="rotate-45" /> */}
                        </button>

                    </div>
                </div>
                </div>
              
            </div>
        </div>

    )
}

export default ChatBox