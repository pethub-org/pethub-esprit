
import './navbar.scss'
import {Link} from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { useContext } from 'react-router';
import {AuthContext} from '../..//context/AuthContext'
const navbar = () => {
  //const {user} = useContext(AuthContext);
 
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
import dropdown from "./dropdown";
import Dropdown from "./dropdown";
import MessageDropdown from "../messages/MessageDropdown";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";



const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { auth ,setAuth} = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');


  const logout = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/auth/logout', {});
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
    <div className='navbar'>
      <div className="left">

        <Link to="/" style={{textDecoration:"none"}}>
        <h2>PetHub</h2>

        <Link to="/" style={{ textDecoration: "none" }}>
          <span><Link to="/" style={{textDecoration:'none'}}>PetsHub</Link></span>

        </Link>
        <HomeRoundedIcon/>
        <NightlightRoundRoundedIcon/>
        <GridViewRoundedIcon/>
        <div className="search">

           <SearchRoundedIcon/>
           <input type="text" placeholder='Search' />

          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} />

        </div>
         
      </div>
      <div className="right">

          <PersonRoundedIcon/>
          <ChatBubbleRoundedIcon/>
          <NotificationsRoundedIcon/>
         
          <div className="user">
          <Link  to="/profile/:username">
                <img src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" alt="" />
            </Link>
          </div>
          

        <div style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          
        }}>
          <div style={{marginRight:'20px'}}>
             <Dropdown/>
          </div>
          {/* <div style={{marginRight:'20px'}}> */}
             <MessageDropdown/>
          {/* </div> */}
          {/* <Notification/> */}
     
       </div>

        <FontAwesomeIcon icon={faDoorOpen} onClick={logout} style={{cursor:'pointer'}}/>

        <Link  to={`/profile/${auth._id}`}>
          <PersonOutlinedIcon />
        </Link>
      
     
          {/* <div><NotificationsOutlinedIcon /></div> */}
      
        <div className="user">
          
          <img
            // src={currentUser.photos.length > 0 ?  currentUser.photos[0]?.url : {ProfilePicture}}
            src={ProfilePicture}
            alt=""
          />
          {/* <span>{currentUser.firstname}</span> */}
          <Link  to={`/profile/${auth._id}`}>{auth.firstname} {' '} {auth.lastname}</Link>
          {/* Link to my profile */}
        </div>

      </div>
    </div>
  )
}

export default navbar 
