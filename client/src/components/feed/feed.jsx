import './feed.scss'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import Video from '../Video/Video';
const Feed = () => {

  const desc = useRef()
  const image = useRef()
  const [file,setFile]=useState(null)
  const {user} = useContext(AuthContext)
  const [open,setOpen] =useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      
      
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts/create", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <>
    <div className="share">
    <div className="shareWrapper">
      <div className="shareTop">
        <img className="shareProfileImg" src={user.profilePicture} alt="" />
        <input
          placeholder={"What's in your mind " + user.username}
          className="shareInput"
          ref={desc}
        />
      </div>
      <hr />
      {file && (
        <div className="shareImgContainer">
          <img  className="shareImg" src={URL.createObjectURL(file)}  alt="" />
          <CancelOutlinedIcon className='shareCancelImg' onClick={()=>setFile(null)}/>
        </div>
      )}
      {open && <Video setOpen={setOpen}/>}
     
      <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions" >
            <label htmlFor="file" className="shareOption">
              <PermMediaOutlinedIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText" style={{color:"red"}}>Photo</span>
              <input
              multiple
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                //file we7ed
                onChange={(e) => setFile(e.target.files[0])}
               
              />
            </label>
            
            <div className="shareOption"  >
              <CameraAltOutlinedIcon htmlColor="blue" className="shareIcon" onClick={()=>setOpen(true)} />
              <span className="shareOptionText" style={{color:"blue"}}>Video</span>
            </div>
            <div className="shareOption">
              <AddLocationAltOutlinedIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText" style={{color:"green"}}>Location</span>

            </div>
            <div className="shareOption">
              <AddReactionOutlinedIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText" style={{color:"goldenrod"}}>Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
         
        </form>
        
    </div>
  </div>
  
  </>
);
  
}

export default Feed