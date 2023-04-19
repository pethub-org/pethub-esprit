import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import UserMessage from './UserMessage'
import MyMessage from './MyMessage'
import styles from './chatbox.module.css'
import defaultImg from '../../assets/defaultUser.png' 
import useAuth from '../../hooks/useAuth'

const ChatBox = ({ chatData, setShowChatBox,messages }) => {
    
    const [message, setMessage] = useState('');
    const { auth } = useAuth();

    useEffect(() => { 
        console.log({ chatData })
    },[])

    const handleSendMessage = (e) => {
        e.preventDefault();
        console.log(message)
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
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <MyMessage message="test" />

                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <UserMessage logo={chatData.logo} message={"yooo"} />
                    <MyMessage message="test" />

                    
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