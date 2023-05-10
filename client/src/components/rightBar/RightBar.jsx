import {  useEffect, useState } from "react";
import "./rightBar.scss";
import UserInfo from "./UserInfo";
import ChatBox from "../messages/ChatBox";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ProfilePicture from '../../assets/defaultUser.png';
import User from '../user/user';
import toast, { Toaster } from 'react-hot-toast';
import useSocket from "../../hooks/useSocket";




const RightBar = () => {
  const { auth,setAuth } = useAuth();
  // console.log({auth})
  // all users conversations
  const [conversations, setConversations] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useSocket();

  const [persons, setPersons] = useState([]);
  
  useEffect(()=>{
    const fetchUser = async()=>{
      let { data } = await axiosPrivate.get("/users");
      data = data.map(user => {
        const currentPhoto = user.photos.find(photo => photo.isMain)
        return {
          ...user,
          currentPhoto
        }
      })
      console.log({data})
      setPersons(data)
      // console.log(data)
    }
    fetchUser()

    return () => {
        toast.dismiss();

    }
  },[]);


  useEffect(() => {
    axiosPrivate.get(`/conversations/${auth._id}`).then(res => {
      setConversations(res.data)
      // toast.configure({duration:'200'})
      // console.log({res})
    })
    return () => {
        toast.dismiss();
    }
  },[])

  // show private chatbox
  const [showChatBox, setShowChatBox] = useState(false);
  
  // current chat data
  const [chatData, setChatData] = useState({});

  // current chatbox messages
  const [messages, setMessages] = useState([]);
  const [friendList, setFriendList] = useState([])


  const notify = (data) => toast('You have a new notification !' , { position: 'top-right'},);
  
  useEffect(() => {
    socket.on('notification', (data) => {
      // console.log('socket id for ',auth.username,' ',socket.id)
      // console.log({ data })
      if (data.sender === auth._id) {
        return;
      }
      notify(data)
      return () => {
        // socket.off('notification')
        toast.dismiss();
      }
    })

    socket.on('getNewFriend', (data) => {
      // console.log({data})
      // console.log(data)
      // console.log({ data })
      // console.log(data.sender === auth._id)
      const userId = data.sender === auth._id ? data.receiver : data.sender;
      // console.log({userId})

      axiosPrivate.get('/users/' + userId).then(response => {
        const user = response.data.user;

        setAuth(prev => {
          return {
            ...prev,
            friendList: [...prev.friendList,user]
          }
        })
      })
      return () => {}
    })

    socket.on('getMessage', (data) => {
      notify({ content: 'You have recieved a message.' })
      return () => {
        toast.dismiss();

      }
    })

    // return () => {
    //   socket.off('notification');
    // }
  }, [])

  
  useEffect(() => {
    axiosPrivate.get(`/messages/conversation/${chatData.conversationId}`).then(response => {
      setMessages(response.data)
      // console.log("messages ",{response})
    })
    
  }, [chatData])

  useEffect(() => {
    // console.log({friendList})
    const friends = auth?.friendList?.map(friend => <UserInfo key={friend._id}
                                                conversations={conversations} setConversations={setConversations}                  
                                                setShowChatBox={setShowChatBox}
                                                userInfo={friend} setChatData={setChatData} 
                                                setMessages={setMessages}
                                                />)
    setFriendList(friends)
 },[auth.friendList,conversations,friendList])
  return (
    <div className="rightBar">
      <div className="container" >
              <div className="item">
          <span>
            Suggestions For You
          </span>
          <div className="user-container">
            {persons.map((person, id) => {
              if (person._id !== auth._id) return <User person={person} key={person._id} />;
            })}
          </div>
        </div>
  
        <div className="item" style={{overflowY:'visible' , height:'800px'}}>
          <span>Friends</span>
            {friendList?.length > 0 ? friendList : <p style={{color:'white'}}>You dont have friends yet</p>}
            {/* {auth?.friendList?.lenght > 0 ? friends : <p style={{color:'white'}}>You dont have friends yet</p>} */}
          {showChatBox && <ChatBox chatData={chatData} conversations={conversations} setShowChatBox={setShowChatBox} messages={messages} setMessages={setMessages} />}
    
   
        </div>

        <Toaster  />
        
      </div>
    </div>
  );
};

export default RightBar;