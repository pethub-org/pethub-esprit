import "./leftBar.scss";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Link } from "react-router-dom";

const leftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg"
              alt=""
            />

            <span>Anis Ammar</span>
          </div>
          <div className="item">
            <StorefrontRoundedIcon htmlColor="tomato" className="shareIcon" />
            <span>MarketPlace</span>
          </div>
          <div className="item">
            <Groups2RoundedIcon htmlColor="#5271ff" className="shareIcon" />
            <span>Group</span>
          </div>
          <div className="item">
            <Link to={"/market"}>
              <StorefrontRoundedIcon htmlColor="green" className="shareIcon" />
              <span>MarketPlace</span>
            </Link>
          </div>
          <div className="item">
            <StorefrontRoundedIcon htmlColor="gray" className="shareIcon" />
            <span>MarketPlace</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon" />
            <span>Events</span>
          </div>
          <div className="item">
            <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon" />
            <span>Games</span>
          </div>
          <div className="item">
            <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon" />
            <span>Events</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon" />
            <span>Events</span>
          </div>
          <div className="item">
            <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon" />
            <span>Games</span>
          </div>
          <div className="item">
            <EmojiEventsRoundedIcon htmlColor="orange" className="shareIcon" />
            <span>Events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default leftBar;
