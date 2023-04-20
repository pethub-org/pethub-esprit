import "./profile.scss"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Posts from '../../components/Posts/Posts'
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
const Profile = () => {
  const [user,setUser] = useState({})
  const username = useParams().username
   const {user:currentUser} = useContext(AuthContext)

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await  axios.get(`/users?username=${username}`);
      setUser(res.data)
    };
    fetchUser();
  },[username])
  return (
    <div className="profile">
      <div className="images">
      <img className="cover" src={currentUser.coverPicture} alt="" />
      <img className="profilePic"  src={currentUser.profilePicture} alt="" />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a href="https://www.youtube.com/@LamaDev">
              <FacebookOutlinedIcon fontSize="large" />
            </a>
            <a href="https://www.youtube.com/@LamaDev">
              <FacebookOutlinedIcon fontSize="large" />
            </a>
            <a href="https://www.youtube.com/@LamaDev">
              <FacebookOutlinedIcon fontSize="large"/>
            </a>
          </div>
          <div className="center">
            <span>{currentUser.username}</span>
            
            <div className="info">
               <button className="btn1">
                <PersonAddAlt1OutlinedIcon/>Follow
                </button>
               <button className="btn2">
                <QuestionAnswerOutlinedIcon/>Message</button>
            </div>
          </div>
          <div className="right">
              <MoreHorizRoundedIcon/>
          </div>
        </div>
    
      </div>
      <Posts/>
    </div>
  )
}

export default Profile