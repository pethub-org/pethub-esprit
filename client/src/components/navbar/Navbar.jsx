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
  
  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration:"none"}}>
        <h2>PetHub</h2>
        </Link>
        <HomeRoundedIcon/>
        <NightlightRoundRoundedIcon/>
        <GridViewRoundedIcon/>
        <div className="search">
           <SearchRoundedIcon/>
           <input type="text" placeholder='Search' />
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
          

      </div>
    </div>
  )
}

export default navbar 
