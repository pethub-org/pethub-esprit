import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import UserMessage from './UserMessage'
import MyMessage from './MyMessage'
import styles from './chatbox.module.css'
import defaultImg from '../../assets/defaultUser.png' 
import useAuth from '../../hooks/useAuth'
import { axiosPrivate } from '../../api/axios'
import useSocket from '../../hooks/useSocket'
import { Link } from 'react-router-dom'

const ChatBox = ({ conversations,chatData, setShowChatBox,messages,setMessages }) => {
    
    const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([])
    const [conversation,setConversation] = useState();
    const { auth } = useAuth();
    const { socket } = useSocket();
 
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


    // useEffect(() => {
    //     axiosPrivate.get(`/messages/conversation/${chatData.conversationId}`)
    // },[])

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            //   console.log({ message })
        // console.log({ chatData})
        axiosPrivate.post(`/messages`, {
            sender: auth._id,
            conversationId:chatData.conversationId,
            text:message
        }).then(response => {
            setMessages(prev => [...prev, response.data])
            // 
            socket.emit('sendMessage',{senderId:auth._id,text:message})
        })
        }
      
    }
    return (
        // <div className={styles.relative}>
            <div className={styles.container} >

                {/* header */}
                <div className={styles.header}>
                <img src={chatData?.currentPhoto ? chatData?.currentPhoto?.url : defaultImg} style={{ width: '25px', height: '25px', borderRadius: '50%' }} alt="profile" className={styles.img} />
                <Link to={"/profile/"+chatData._id} style={{color:'white'}}>
                    <p>{chatData.firstname} {' '} {chatData.lastname}</p>
                
                </Link>
                    <div style={{cursor:'pointer'}} onClick={() => setShowChatBox(prev => !prev)}>X</div>
                </div>

                {/* message content */}
                <div className={styles.messageContent}>
                    <div style={{height:'80%'}}>
                         {messages?.length > 0 ? messages?.map(message => {
                        if (message.sender === auth._id) {
                            return <MyMessage message={message.text} key={message._id}/>
                        } else {
                            return <UserMessage userPhoto={chatData?.currentPhoto?.url} message={message.text} key={message._id}/>
                        }
                    }) : <p style={{marginLeft:'16px',marginTop:'4px'}}>No messages yet</p>}
                   </div>

                    
                 
                </div>

                <div className={styles.footer} style={{ zIndex: '1000'}}>
                    <div className={styles.footerContent} >

                            <input type="text" placeholder='Type here'
                                style={{marginTop:'16px'}}
                            className={styles.footerInput}
                            value={message}
                                onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey && e.target.value !== '') {
                                        handleSendMessage(e)
                                        setMessage('')
                                    }
                                }} />
                        

                    </div>
                </div>
              
            </div>
        // </div>

    )
}

export default ChatBox