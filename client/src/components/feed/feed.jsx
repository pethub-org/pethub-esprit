import './feed.scss'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import Location from '../Map/Location';
import {  useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Video from '../Video/Video';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Posts from '../posts/Posts';
import ProfilePicture from '../../assets/defaultUser.png';


const Feed = ({posts,setPosts}) => {
  const {auth:user} = useAuth()
 
  const desc = useRef()
  const hashtags = useRef()
  const tags = useRef()
  const [setHashtags] = useState('')
  const image = useRef()
  const [file, setFile] = useState(null)
  const [open, setOpen] = useState(false)
  const [post, setPost] = useState()
  const [location, setLocation] = useState([0, 0]);
  const [showMap, setShowMap] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [persons, setPersons] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectDisplay, setSelectDisplay] = useState(false);
  const [stream, setStream] = useState(false)
  const [img,setImg]=useState(null)
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [feeling, setFeeling] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // const {user} = useContext(AuthContext)
  const axios = useAxiosPrivate();

  //feelings
  const handleFeelingChange = async (e) => {
    const newFeeling = e.target.value;
    setFeeling(newFeeling);

    try {
      await axios.put(`/api/posts/${post._id}/feeling`, { feeling: newFeeling });
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleOptionClick = () => {
    setShowSelect(true);
  };

  const handleSelectClose = () => {
    setShowSelect(false);
  };

  const handleSelectFile=(e) => {
    setImg(e.target.files[0])
  }
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get("/api/users");
      setPersons(data)
      console.log(data)
    }
    fetchUser()
  }, []);

  
  //hashtag 
  const Taghandler = async (req, res) => {
    try {
      const res = await axios.get(`/posts/hashtags/${post.hashtags}`)
      return res
    }
    catch (err) {
      res.status(400).json(err)

    }
  }
  const handleToggleInput = () => {
    setShowInput(!showInput);
  };
  //map
  const handleLocationClick = () => {
    setShowMap((prevState) => !prevState);
  };
  const onLocationSelected = (location) => {
    setSelectedLocation(location);
    setShowMap(false);
  };
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }



  //upload file and create post 
  const handleInputChange = () => {
    const descValue = desc.current.value.trim();
    setIsValid(descValue !== "" );
  };
  const submitHandler = async (e) => {
    if (!isValid) {
      return;
    }
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      hashtags: hashtags?.current?.value ? hashtags.current.value  : null 
    };
    if (file) {
      // const data = new FormData();
      // const fileName = Date.now() + file.name;
      // data.append("name", fileName);
      // data.append("file", file);
      // newPost.image = fileName;
      // // console.log(newPost);
      // try {
      //   await axios.post("/api/upload", data);
      // } catch (err) {}
       try {
      const res = await axios.post("/api/posts/create", {...newPost,image:img},{ headers: { "Content-Type": 'multipart/form-data' } });
      // console.log({res})
      setPosts(prevPosts => [res.data,...prevPosts] )
        window.location.reload();
        } catch (err) {}
    } else {
           try {
      const res = await axios.post("/api/posts/create",newPost);
      // console.log({res})
      setPosts(prevPosts => [res.data,...prevPosts] )
        window.location.reload();
        } catch (err) {}
      
    }
    
   
  };
  return (
    <>
    <div className="share">
    <div className="shareWrapper">
    <div className="shareTop">
      <img
        className="shareProfileImg"
        src={user?.currentPhoto ? user?.currentPhoto?.url : ProfilePicture}
        alt={user?.firstname}
      />
      <input
        placeholder={
          "What's in your mind " +
          user?.firstname + 
          " " +
          user?.lastname
        }
        className="shareInput"
        ref={desc}
        style={{
          padding: "15px",
          borderRadius: "15px",
          marginTop: "6px",
          opacity: "0.9",
          textTransform:"capitalize"
        }}
        onChange={handleInputChange}
        
      />
      {showInput && (
        
        <input
          placeholder={"Add a hashtag to your post"}
          className="shareInput"
          ref={hashtags}
          style={{
            padding: "15px",
            borderRadius: "15px",
            marginTop: "6px",
            marginLeft: "6px",
            opacity: "0.9",
          }}
          onChange={handleInputChange}
        />
       
    
      )}
        
     
    </div>
      <hr />
      {file && (
        <div className="shareImgContainer">
          <img className="shareImg" src={URL.createObjectURL(file)} name="image"  alt="" onChange={handleSelectFile}/>
          <CancelOutlinedIcon className='shareCancelImg' onClick={()=>setFile(null)}/>
        </div>
      )}
                  {showMap && (
            <Location
              setOpen={setShowMap}
              updatePostLocation
            /> 
            
          )}
      
     
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
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    handleSelectFile(e)
                    // setImg(e)
                  }}
               
              />
            </label>
            
          
              <div className="shareOption" onClick={handleToggleInput}>
                <TagOutlinedIcon htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText" style={{ color: "blue" }}>Hashtag</span>

              </div>
              <div className="shareOption" onClick={handleLocationClick}>
                <AddLocationAltOutlinedIcon htmlColor="green" className="shareIcon" />
                <span className="shareOptionText" style={{ color: "green" }}>Location</span>

              </div>
              <div className="shareOption" onBlur={handleSelectClose}>
                <AddReactionOutlinedIcon htmlColor="goldenrod" className="shareIcon" />
                <span
                  className="shareOptionText"
                  style={{ color: 'goldenrod' }}
                  onClick={handleOptionClick}
                >
                  Feelings
                </span>
                {showSelect && (
                  <select value={feeling} onChange={handleFeelingChange}  >
                    <option value="" style={{ color: "yellow" }}>Select feeling</option>
                    <option value="happy" data-icon="😊">
                      <span>&#128512;</span>Happy
                    </option>
                    <option value="sad" data-icon="😢">
                      <span>&#128531;</span>Sad
                    </option>
                    <option value="angry" data-icon="😠">
                      <span>&#128548;</span>Angry
                    </option>
                  </select>
                )}
              </div>
          </div>
          <button className="shareButton" type="submit" disabled={!isValid} >
            Share
          </button>
         
        </form>
       
        
    </div>
  </div>
        {/* <Posts/> */}
  </>
);
  
}


export default Feed