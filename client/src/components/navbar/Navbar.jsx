import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import ProfilePicture from '../../assets/defaultUser.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed,faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Notification from "../notifications/Notification";
import dropdown from "./dropdown";
import Dropdown from "./dropdown";



const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/auth/logout', {});
    localStorage.removeItem('user');
    navigate('/login')
  }


  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>lamasocial</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <div style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          
        }}>
          <div style={{marginRight:'20px'}}>
             <Dropdown/>
          </div>
          {/* <Notification/> */}
     
       </div>

        <FontAwesomeIcon icon={faDoorOpen} onClick={logout} style={{cursor:'pointer'}}/>

        <Link to="/profile/1">
          <PersonOutlinedIcon />
        </Link>
      
     
          {/* <div><NotificationsOutlinedIcon /></div> */}
      
        <div className="user">
          
          <img
            // src={currentUser.photos.length > 0 ?  currentUser.photos[0]?.url : {ProfilePicture}}
            src={ProfilePicture}
            alt=""
          />
          <span>{currentUser.firstname}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
