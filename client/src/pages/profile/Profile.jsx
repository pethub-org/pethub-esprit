import "./profile.scss"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Posts from '../../components/Posts/Posts'
const profile = () => {
  return (
    <div className="profile">
      <div className="images">
      <img className="cover" src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" alt="" />
      <img className="profilePic"  src="https://t4.ftcdn.net/jpg/01/18/03/35/360_F_118033506_uMrhnrjBWBxVE9sYGTgBht8S5liVnIeY.jpg" alt="" />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a href="https://www.youtube.com/@LamaDev">
              <FacebookOutlinedIcon fontSize="large" />
            </a>
            <a href="https://www.youtube.com/@LamaDev">
              <FacebookOutlinedIcon fontSize="large" />
            </a>
            <a href="https://www.youtube.com/@LamaDev">
              <FacebookOutlinedIcon fontSize="large"/>
            </a>
          </div>
          <div className="center">
            <span>Anis Ammar</span>
            <div className="info">
               <button className="btn1">
                <PersonAddAlt1OutlinedIcon/>Follow
                </button>
               <button className="btn2">
                <QuestionAnswerOutlinedIcon/>Message</button>
            </div>
          </div>
          <div className="right">
              <MoreHorizRoundedIcon/>
          </div>
        </div>
    
      </div>
      <Posts/>
    </div>
  )
}

export default profile