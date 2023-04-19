import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import useAuth from "../../hooks/useAuth";
import defaultUser from '../../assets/defaultUser.png';
const Share = () => {
  const {auth} = useAuth()
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            // src={auth?.photos[0] ? auth?.photos[0]  :defaultUser}
            src={""}
            alt={auth.firstname}
          />
          <input type="text" placeholder={`What's on your mind ${auth.firstname}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
