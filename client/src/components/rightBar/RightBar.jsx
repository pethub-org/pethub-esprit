import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./rightBar.scss";
import UserInfo from "./UserInfo";
import ChatBox from "../messages/ChatBox";
import useAuthContext from "../../hooks/useAuth";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ProfilePicture from '../../assets/defaultUser.png';


const RightBar = () => {
  const { auth } = useAuth();
  // all users conversations
  const [conversations, setConversations] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(`/conversations/${auth._id}`).then(res => {
      setConversations(res.data)
      console.log({res})
    })
  },[])

  // show private chatbox
  const [showChatBox, setShowChatBox] = useState(false);
  
  // current chat data
  const [chatData, setChatData] = useState({});

  // current chatbox messages
  const [messages, setMessages] = useState([]);
  const [friendList, setFriendList] = useState([])
  
  useEffect(() => {
    axiosPrivate.get(`/messages/conversation/${chatData.conversationId}`).then(response => {
      setMessages(response.data)
      // console.log("messages ",{response})
    })
    
  }, [chatData])

  useEffect(() => {
    const friends = auth?.friendList?.map(friend => <UserInfo key={friend._id}
                                                conversations={conversations} setConversations={setConversations}                  
                                                setShowChatBox={setShowChatBox}
                                                userInfo={friend} setChatData={setChatData} 
                                                setMessages={setMessages}
                                                />)
    setFriendList(friends)
 },[auth.friendList,conversations])
  return (
    <div className="rightBar">
      <div className="container" >
  
        <div className="item" style={{overflowY:'visible' , height:'800px'}}>
          <span>Friends</span>
            {friendList?.length > 0 ? friendList : <p style={{color:'white'}}>You dont have friends yet</p>}
            {/* {auth?.friendList?.lenght > 0 ? friends : <p style={{color:'white'}}>You dont have friends yet</p>} */}
          {showChatBox && <ChatBox chatData={chatData} conversations={conversations} setShowChatBox={setShowChatBox} messages={messages} setMessages={setMessages} />}
    
   
        </div>
      </div>
    </div>
  );
};

export default RightBar;