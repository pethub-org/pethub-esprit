
import './leftBar.scss'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
const leftBar = () => {

import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import {Link, useNavigate} from 'react-router-dom'
import useAuth from "../../hooks/useAuth";
import defaultUser from '../../assets/defaultUser.png'


const LeftBar = () => {

  const { auth } = useAuth();
  const navigate = useNavigate();

  const goToEventPage = () => {
      navigate('/events')
    }



  return (
    <div className='leftBar'>
      <div className="container">
        <div className="menu">

         <div className="user">
         <img src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" alt="" />

                <span>Anis Ammar</span>

          <div className="user">
            <img
              // src={auth?.photos[0] ? auth?.photos[0] : defaultUser }
              src=""
              alt={auth?.firstname}
            />
            <span>{auth?.firstname}</span>
          </div>
          <div className="item" onClick={() => navigate('/friends')}>
            <img src={Friends} alt="" />
            <span>Friends</span>

          </div>
          <div className="item">
             <StorefrontRoundedIcon htmlColor="tomato" className="shareIcon"/>
            <span>MarketPlace</span>
          </div>
          <div className="item">
             <Groups2RoundedIcon htmlColor="#5271ff" className="shareIcon"/>
            <span>Group</span>
          </div>
          <div className="item">
             <StorefrontRoundedIcon htmlColor="green" className="shareIcon"/>
            <span>MarketPlace</span>
          </div>
          <div className="item">
             <StorefrontRoundedIcon htmlColor="gray" className="shareIcon"/>
            <span>MarketPlace</span>
          </div>
         </div>
         <hr/>
         <div className="menu">
             <span>Your shortcuts</span>
             <div className="item">
             <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon"/>
             <span>Events</span>
             </div>
             <div className="item">
             <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon"/>
             <span>Games</span>
             </div>
             <div className="item">
             <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon"/>
             <span>Events</span>
             </div>
         </div>
         <hr/>
         <div className="menu">
             <span>Others</span>
             <div className="item">
             <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon"/>
             <span>Events</span>
             </div>
             <div className="item">
             <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon"/>
             <span>Games</span>
             </div>
             <div className="item">
             <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon"/>
             <span>Events</span>
             </div>
         </div>
      </div>
    </div>
  )
}

export default leftBar