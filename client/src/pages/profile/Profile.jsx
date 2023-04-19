
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

import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import ProfilePicture from '../../assets/defaultUser.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const {id} = useParams();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleUplodatePicture, setToggleUplodatePicture] = useState(true);
  
  const [email,setEmail] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
  const [image, setImage] = useState(null)
  const [profilePic, setProfilePic] = useState('');
  const [userProfileData, setUserProfileData] = useState({});
  const { auth,setAuth } = useAuth();


  
  const handleSelectFile = (e) => {
    setImage(e.target.files[0])
    
  }

  const uploadPicture = async (e) => {
    e.preventDefault();
    try {
    //    const response = await axios.post(`${BASE_URL}/users/update/photos/${currentUser.id}`, {
    //       image
    //     },
    //      {
    //        headers: {
    //          "Content-Type": "multipart/form-data",
    //          'Authorization': 'Bearer ' + currentUser.token,

    //        },
          
    //     },
    // );
    // setProfilePic(response.data.photos[0]);
      const response = await axiosPrivate.post(`/users/update/photos/${auth._id}`, { image }, { headers: { "Content-Type": 'multipart/form-data' } })
    setProfilePic(response.data.photos[0]);
      
    } catch (error) {
      console.log({error})
    }

    // const response = await axios.post(`${BASE_URL}/users/update/photos/${currentUser.id}`)
}

  useEffect(() => {
      if (id === auth.id) {
           setEmail(auth.email)
            setFirstname(auth.firstname)
             setLastname(auth.lastname)
      return;
    }
    // axios.get(`http://localhost:8080/users/${id}`,{headers:{Authorization: `Bearer ${currentUser.token}`}}).then(res => setUserProfileData(res.data.user))
    axiosPrivate.get(`/users/${id}`).then(res => setUserProfileData(res.data.user))
    

 
  },[])
  const handleUpdate = async (e) => {
    e.preventDefault();
    // try {
      // console.log(`${BASE_URL}/${currentUser.id}`)
      // const res = await axios.put(`${BASE_URL}/users/${currentUser.id}`, {
      // email,
      // firstname,
      // lastname,
      // password
      // }, {
      //   headers: {
      //     'Authorization': 'Bearer ' + currentUser.token,
      //     'Content-Type':'application/json'
      //   },
        // withCredentials: true
    //   });
    // } catch (error) {
    //   console.log(error)
      // setEmail(error.message)
    try {
      const res = await axiosPrivate.put(`/users/${auth._id}`,{email,firstname,lastname,password})
    } catch (error) {
      console.log(error)
      setEmail(error.message)
    }
    }
  
  if (id !== auth._id) {
  return (
    <div className="profile">

    
      <div className="images">
        {/* <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        /> */}
        {/* <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        /> */}

         <img
          src={auth.photos.length > 0 ? auth.photos[0].url : ProfilePicture}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{userProfileData?.firstname} {' '} {userProfileData?.lastname} </span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}>
                <button onClick={() => setToggleUpdate(prev => !prev)}  style={{marginRight:'16px'}}>ADD</button>
              </div>
            </div>
         
           
          </div>
        
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        
    



      <Posts/>
      </div>
    </div>
  );
  }
  return (
    <div className="profile">
      {/* <button onClick={async() => {
        const response = await axios.get(`${BASE_URL}/users`, {withCredentials:true}, {
          headers: {
            'Authorization': 'Bearer ' + currentUser.token,
            'Content-Type': 'application/json'
          },
        });
        console.log({response});
      }}>Test http</button> */}
      <div className="images">
        {/* <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        /> */}
        {/* <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        /> */}

         <img
          src={auth.photos.length > 0 ? auth.photos[0].url : ProfilePicture}
          alt=""
          className="profilePic"
        />

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

            {/* <span>{firstname} </span> */}
            <span>{auth?.firstname} {' '} {auth?.lastname} </span>


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