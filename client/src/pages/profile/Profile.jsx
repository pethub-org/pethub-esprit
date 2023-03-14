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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Profile = () => {
  const [toggleUpdate, setToggleUpdate] = useState(true);
  const BASE_URL = 'http://localhost:8080/users';
  const [email,setEmail] = useState('')
  const [firstname,setFirstname] = useState('')
  const [lastname,setLastname] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    setEmail(currentUser.email)
    setFirstname(currentUser.firstname)
    setLastname(currentUser.lastname)
  },[])
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(`${BASE_URL}/${currentUser.id}`)
      const res = await axios.put(`${BASE_URL}/${currentUser.id}`, {
      email,
      firstname,
      lastname,
      password
      }, {
        headers: {
          'Authorization': 'Bearer ' + currentUser.token,
          'Content-Type':'application/json'
        },
        // withCredentials: true
      });
    } catch (error) {
      console.log(error)
      // setEmail(error.message)
    }
  }
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
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
            <span>Jane Doe</span>
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
            <div style={{marginTop:'5px'}}>
              <button style={{marginRight:'20px'}}>follow</button>
              <button onClick={handleUpdate}>update</button>
            </div>
            <div>
               <form>
              <input type="email" value={currentUser.email} palceholder="email" onChange={(e) => setEmail(e.target.value)}/>
              <input type="text" value={currentUser.firstname} palceholder="Firstname" onChange={(e) => setFirstname(e.target.value)}/>
              <input type="text" value={currentUser.lastname} palceholder="Lastname" onChange={(e) => setLastname(e.target.value)}/>
              <input type="text" value={password} placeholder='Enter New Password'onChange={(e) => setPassword(e.target.value)}/>
              <input type="text" value={confirmPassword} placeholder='Confirm New Password'  onChange={(e) => setConfirmPassword(e.target.value)}/>
            </form>
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
};

export default Profile;
