import './feed.scss'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
const feed = () => {
  return (
    <div className="share">
    <div className="shareWrapper">
      <div className="shareTop">
        <img className="shareProfileImg" src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" alt="" />
        <input
          placeholder="What's in your mind "
          className="shareInput"
        />
      </div>
      <hr />
      <div className="shareBottom">
          <div className="shareOptions">
              <div className="shareOption">
                  <PermMediaOutlinedIcon htmlColor="tomato" className="shareIcon"/>
                  <span className="shareOptionText">Photo or Video</span>
              </div>
              <div className="shareOption">
                  <LabelImportantOutlinedIcon htmlColor="#5271ff" className="shareIcon"/>
                  <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                  <AddLocationAltOutlinedIcon htmlColor="green" className="shareIcon"/>
                  <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                  <AddReactionOutlinedIcon htmlColor="goldenrod" className="shareIcon"/>
                  <span className="shareOptionText">Feelings</span>
              </div>
          </div>
          <button className="shareButton">Share</button>
      </div>
    </div>
  </div>
);
  
}

export default feed