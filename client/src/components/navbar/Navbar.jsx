import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import ProfilePicture from '../../assets/defaultUser.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed,faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Notification from "../notifications/Notification";
import NotifcationDropdown from "./NotifcationDropdown";
import MessageDropdown from "../messages/MessageDropdown";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import FriendRequests from './FriendRequests';
import useSocket from "../../hooks/useSocket";
import PeopleIcon from '@mui/icons-material/People';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';


const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { auth ,setAuth} = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { socket } = useSocket();


  const logout = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/auth/logout', {});
    socket.disconnect();
    setAuth({})
    localStorage.removeItem('user');
    navigate('/login')
  }
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      // axios.get('')
      navigate({
        pathname: '/search',
        search: createSearchParams({
          name:search
        }).toString()
      })
    }
  }

  return (
    <div className="navbar" style={{ width:'100%' }}>
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span><Link to="/" style={{textDecoration:'none',color:'white'}}>PetsHub</Link></span>
        </Link>
        
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search"            
        style={{
                padding: '10px',
                borderRadius: '15px',
                marginTop:'10px',
                marginLeft:'5px',
                opacity:"0.9",
                height:"40px"
              }}>
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} style={{color:'black' , border:'1px', opacity:"0.9"}} />
        </div>
      </div>
      <div className="right">
        <div style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
          <div >
             <FriendRequests/>
          </div>
             
          <div style={{marginRight:"20px"}}>
               <NotifcationDropdown/>
          </div>
      
              {/* <MessageDropdown /> */}
          



          <div style={{marginRight:'18px'}}>
            <FontAwesomeIcon icon={faDoorOpen} onClick={logout} style={{cursor:'pointer'}}/>

          </div>
     
     
       </div>


        {/* <Link  to={`/profile/${auth._id}`}>
          <PersonOutlinedIcon />
        </Link> */}
        

      
     
          {/* <div><NotificationsOutlinedIcon /></div> */}
      
        <div className="user" style={{marginRight:'30px'}}>
          
          <img
            // src={currentUser.photos.length > 0 ?  currentUser.photos[0]?.url : {ProfilePicture}}
            src={auth?.currentPhoto ? auth?.currentPhoto?.url : ProfilePicture}
            alt=""
          />
          {/* <span>{currentUser.firstname}</span> */}
          <Link  to={`/profile/${auth._id}`} style={{textTransform:'capitalize',color:'white'}}>{auth.firstname} {' '} {auth.lastname}</Link>
          {/* Link to my profile */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
