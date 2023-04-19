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
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span><Link to="/" style={{textDecoration:'none'}}>PetsHub</Link></span>
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
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleSearch} />
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
  );
};

export default Navbar;
