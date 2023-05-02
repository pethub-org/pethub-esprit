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
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import ProfilePicture from '../../assets/defaultUser.png';

const LeftBar = () => {

  const { auth } = useAuth();
  const navigate = useNavigate();

  const goToEventPage = () => {
      navigate('/events')
    }


  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
        <div className="item" >
              <HomeOutlinedIcon style={{ width:"30px",height:"30px"}}/>
            <Link to="/" style={{color:'white'}}>
              <span>Home</span>
            </Link>
          </div>
          <div className="user">
            <img
            style={{ width:"30px",height:"30px"}}
              // src={auth?.photos[0] ? auth?.photos[0] : defaultUser }
              src={ auth?.currentPhoto ? auth?.currentPhoto?.url : ProfilePicture}
              alt={auth?.firstname}
            />
            <span>
              <Link to={"/profile/"+auth._id} style={{color:'white',textTransform:'capitalize'}}>{auth?.firstname}{' '}{auth?.lastname}</Link>
            </span>
          </div>
          <div className="item" >
              <img src={Friends} alt="" style={{ width:"30px",height:"30px"}}/>
            <Link to="/friends" style={{color:'white'}}>
              <span>Friends</span>
            </Link>
          </div>
          {/* <div className="item">
            <img src={Groups} alt="" />
            <span><Link to="/addprod">ADD PRODUCT</Link></span>
          </div> */}
          <div className="item">
            <img src={Market} alt=""  />
            <span><Link to="/market" style={{color:'white'}}>Marketplace</Link></span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span><Link to="/save" style={{color:'white'}}>Saved Product</Link></span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
             <img src={Events} alt="" />
             <span><Link to="/events" style={{color:'white'}}>Events</Link></span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span><Link to={'/games'} style={{color:"white"}}>Gaming</Link></span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
