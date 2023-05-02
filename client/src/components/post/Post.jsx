import './post.scss'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Link } from 'react-router-dom'
import Comments from '../comments/Comments'
import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
import { format } from 'timeago.js'
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import defaultUser from '../../assets/defaultUser.png';
import toast, { Toaster } from 'react-hot-toast';
// import { AuthContext } from '../../context/AuthContext';


const Post = ({ post, setPosts }) => {
  const { auth: currentUser } = useAuth()
  const [like, setLike] = useState(post.likes.length)
  const [share, setShare] = useState(post.shares.length)
  const [hashtags, setHashtag] = useState('')
  const [feeling, setFeeling] = useState('')
  const [tags, setTags] = useState('')
  const [com, setComm] = useState(post.comments.length)
  const [user, setUser] = useState({})
  const [islike, setIsLike] = useState(false)
  const [image, setImage] = useState('')
  const [desc, setDesc] = useState('');
  
  //transorme lpost lel update
  const [updateMode, setUpdateMode] = useState(false);
  const axios = useAxiosPrivate();

  const PF = "http://localhost:3000/images/";
  useEffect(() => {
    //include user ou non
    setIsLike(post?.likes?.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${post.userId}`);
      setUser(res.data)
      setDesc(res.data.desc)
      setImage(res.data.image)
    };
    fetchUser();

  }, [])

  //temporaire like 
  const liked = false;
  //update post 
  const updateHandler = async () => {
    try {
      await axios.put("/api/posts/" + post._id, { user: currentUser.userId, desc, image })
      //window.location.reload();
      
    }
    catch (err) { }

  };
  //delete post
  const DeleteHandler = async () => {
    try {
      await axios.delete("/api/posts/" + post._id, { user: currentUser._id })
      setPosts(prevPosts => prevPosts.filter(p => p._id !== post._id));
      //  window.location.reload();
    }
    catch (err) { }
  };
  //like post

  const likeHandler = () => {
    try {
      axios.put("/api/posts/" + post._id + "/like", { userId: currentUser._id })
    }
    catch (err) {

    }
    setLike(islike ? like - 1 : like + 1)
    setIsLike(!islike)


  }
  const [commentOpen, setCommentOpen] = useState(false);
  //copy link  post
  const copyHandler = () => {
    try {

      navigator.clipboard.writeText(`http://localhost:8080/api/posts/${post._id}`)
      //alert("Link copied to clipboard!");
      toast( 'Link post copied')

    }
    catch (err) {
      console.log("Failed to copy: ", err);
    }

  };


  //share post 
  const shareHandler = async () => {
    try {
      await axios.post(`/api/posts/${post._id}/share`, { userId: currentUser._id });
      //alert('Post shared!');
      toast(currentUser.firstname.charAt(0).toUpperCase()+ currentUser.firstname.slice(1)+' ' + currentUser.lastname.charAt(0).toUpperCase() +currentUser.lastname.slice(1) + ' ' + 'has shared your post')
  
    } catch (err) {
      // console.log(err);
      alert('Failed to share post!');
    }
  };
  //report  
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/posts/${post._id}/report`, { reason: reportReason });
      //alert('Post reported as inappropriate');
      toast( 'Post reported as inappropriate')
      setShowReportForm(false);
      setReportReason('');
    } catch (error) {
      console.error(error);
      alert('Error reporting post');
    }
  };

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={currentUser.currentPhoto ? currentUser.currentPhoto.url : defaultUser} alt={currentUser.firstname} />
            </Link>
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className='name' style={{ color: 'white' }}>
                  {currentUser.firstname.charAt(0).toUpperCase()}{currentUser.firstname.slice(1)} {' '}
                  {currentUser.lastname.charAt(0).toUpperCase()}{currentUser.lastname.slice(1)}
                </span>

              </Link>
              <div className="location-date">
                <span className='date'>{format(post.createdAt)}</span>
                <p className="location"><LocationOnOutlinedIcon />Tunisia</p>
              </div>

              <div>
                <h5 style={{ marginTop: "1px", marginRight: "1px", color: "goldenrod" }} onChange={(e) => setFeeling(e.target.value)} ><span>&#128512;</span>{post.feeling}</h5>
              </div>
            </div>

          </div>
          
          <div class="dropdown">
            <button class="dropbtn"><MoreHorizRoundedIcon htmlColor="white" />
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              {post.userId === currentUser._id &&
                <a onClick={DeleteHandler}><DeleteOutlineOutlinedIcon /> Delete Post </a>}
              {post.userId === currentUser._id && 
                <a onClick={() => setUpdateMode(true)}> <EditOutlinedIcon /> Edit post</a>}

              <a onClick={copyHandler} ><InsertLinkOutlinedIcon /> <Toaster/> Copy Link Post</a>
              <a onClick={() => setShowReportForm(true)}><ReportGmailerrorredOutlinedIcon /> <Toaster/> Report Post</a>
              {showReportForm && (
                <form className='reportForm' onSubmit={handleReportSubmit}>
                  <label className='report'>
                    Reason for report:
                    <input className='reportInput' type="text" value={reportReason} onChange={(e) => setReportReason(e.target.value)} placeholder='Write the reason of your report' style={{
                      padding: '15px',
                      borderRadius: '15px',
                      marginTop: '5px',
                      marginLeft: '6px',
                      marginBottom: '10px',
                      width: '100%',
                      height: '50px',
                      border: "none",
                      opacity: "0.9"
                    }} />
                  </label>
                  <div className='reportBtns' style={{marginBottom:"15px",borderRadius:"12px"}}>
                    <button className='reportBtn' type="submit">Report post</button>
                    <button className='cancelBtn' type="button" onClick={() => setShowReportForm(false)}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
        
     
            

        {updateMode ? <input value={desc} className='textarea' autoFocus      style={{
                padding: '15px',
                borderRadius: '15px',
                marginTop:'6px',
                opacity:"0.9",
                border:"none"
              }}
              onChange={(e) => setDesc(e.target.value)
        } /> :
          (
            <>
              <p style={{ lineHeight: "1.8" }}>{post.desc}</p>
              </>
            
          )
        }
            
        {updateMode ? <input value={hashtags} className='textarea' autoFocus style={{
                padding: '15px',
                borderRadius: '15px',
                marginTop:'6px',
                opacity:"0.9",
                border:"none",
               
              }} 
              onChange={(e) => setHashtag(e.target.value)
        } /> :
          (
            <div className="content" style={{ color: "blue", lineHeight: "1.8" }}>
              {post.hashtags && <p>#{post.hashtags}</p>}
              {post.image ? <img src={PF + post.image} alt="image" /> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IHIodtO_PbMwrmVGhxM0DWGUBuQCiVcQRQ&usqp=CAU" alt="image not available" style={{ borderRadius: "20px" }} />}

            </div>
          )
        }
        {updateMode && (
          <button className='change' onClick={updateHandler}>Save changes</button>

        )}
         <hr style={{marginTop:"10px",marginBottom:"10px"}}/>

        <div className="info" >
          <div className="item" >
            {islike ? <FavoriteOutlinedIcon onClick={likeHandler} style={{ color: 'red' }} /> : <FavoriteBorderOutlinedIcon onClick={likeHandler} />}
            {like} Likes

          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <SmsOutlinedIcon />
            {com} Comments
          </div>

          <div className="item" onClick={shareHandler}>
            <ReplyAllOutlinedIcon />
             <Toaster />
           
            {share} Share
          </div>
        </div>
        <hr style={{marginTop:"10px"}}/>
        {commentOpen && <Comments postId={post._id} />}

      </div>
    </div>
  )
}

export default Post