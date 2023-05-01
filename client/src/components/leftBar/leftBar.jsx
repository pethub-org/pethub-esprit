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
    <div className="leftBar">
      <div className="container">
        <div className="menu">
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
          <div className="item" onClick={() => navigate('/addprod')}>
            <img src={Groups} alt="" />
            <span>add product</span>
          </div>
          <div className="item " onClick={() => navigate('/market')}>
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item" onClick={() => navigate('/save')}>
            <img src={Market} alt="" />
            <span>save prod for later</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item" onClick={goToEventPage}>
             <img src={Events} alt="" />
             <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
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
