import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./rightBar.scss";
import UserInfo from "./UserInfo";
import ChatBox from "../messages/ChatBox";
import useAuthContext from "../../hooks/useAuth";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const RightBar = () => {
  const { auth } = useAuth();
  // all users conversations
  const [conversations, setConversations] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(`/conversations/${auth._id}`).then(res => {
      setConversations(res.data)
    })
  },[auth._id])

  // show private chatbox
  const [showChatBox, setShowChatBox] = useState(false);
  
  // current chat data
  const [chatData, setChatData] = useState();

  // current chatbox messages
  const [messages, setMessages] = useState([]);


  
  const friends = auth?.friendList?.map(friend => <UserInfo key={friend._id}
                                                setShowChatBox={setShowChatBox}
                                                userInfo={friend} setChatData={setChatData} 
                                                setMessages={setMessages}
                                                />)
  return (
    <div className="rightBar">
      <div className="container" >
  
        <div className="item" style={{overflowY:'visible' , height:'800px'}}>
          <span>Friends</span>
  
            {friends}
          {showChatBox && <ChatBox chatData={chatData} setShowChatBox={setShowChatBox} messages={messages}/>}
    
   
        </div>
      </div>
    </div>
  );
};

export default RightBar;