import './Post.scss'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import {Link} from 'react-router-dom'
import Comments from '../comments/Comments'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {format} from 'timeago.js'
import { AuthContext } from '../../context/AuthContext';


const Post = ({post}) => {
  const [like,setLike] = useState(post.likes.length)
  const [com,setComm] = useState(post.comments.length)
  const [user,setUser] = useState({})
  const [islike,setIsLike] = useState(false)
  const {user:currentUser} = useContext(AuthContext)
  const [image, setImage] = useState('')
  const [desc, setDesc] = useState('');
  //transorme lpost lel update
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(()=>{
    //include user ou non
    setIsLike(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])
  
  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await  axios.get(`/users/${post.userId}`);
      setUser(res.data)
      setDesc(res.data.desc)
      setImage(res.data.image)
    };
    fetchUser();
  },[post.userId])
  
  //temporaire like 
  const liked =false;
  //update post 
  
   const updateHandler =async ()=>{
    try{
      await axios.put("/posts/" + post._id,  {user :currentUser.userId,desc,image})
      window.location.reload();
     }
     catch(err){}
    
   };
   //delete post
   const DeleteHandler =async()=>{
    try{
     await axios.delete("/posts/" + post._id, {user :currentUser.userId})
     window.location.reload();
    }
    catch(err){}
   };
  //like post

  const likeHandler = ()=>{
    try{
      axios.put("/posts/" +post._id+"/like",{userId:currentUser._id})
    } 
    catch(err){

    }
    setLike(islike ? like-1 : like+1)
    setIsLike(!islike)
    
    
  }
  const [commentOpen, setCommentOpen]= useState(false);
  //copy link  post
  const copyHandler = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.log("Failed to copy: ", err);
    }
  };

  //share post 
  const shareHandler = async () => {
    try {
      await axios.post(`/posts/${post._id}/share`, { userId: currentUser._id });
      alert('Post shared!');
    } catch (err) {
      console.log(err);
      alert('Failed to share post!');
    }
  };

  return (
    <div className='post'>
      <div className="container">
      <div className="user">
        <div className="userInfo">
        <Link to={`/profile/${post.userId}`}  style={{textDecoration:"none",color:"inherit"}}>
           <img src={user.profilePicture } alt="" />
          </Link>
           <div className="details">
            <Link to={`/profile/${post.userId}`}  style={{textDecoration:"none",color:"inherit"}}>
                <span className='name'>{user.username }</span>
               
            </Link>
            <span className='date'>{format(post.createdAt)}</span>
           </div>
          
        </div>
        <div class="dropdown">
    <button class="dropbtn"><MoreHorizRoundedIcon htmlColor="black" />
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      {post.userId === currentUser._id &&
            <a onClick={DeleteHandler}><DeleteOutlineOutlinedIcon /> Delete Post </a>}
      {post.userId === currentUser._id &&
             <a onClick={()=>setUpdateMode(true)}> <EditOutlinedIcon/> Edit post</a>}
     
      <a onClick={copyHandler} ><InsertLinkOutlinedIcon/> Copy Link Post</a>
    </div>
  </div> 
        
        

        </div>
        
      { updateMode ? <textarea  value={desc} className='textarea' autoFocus style={{border:'none'}} onChange={(e)=>setDesc(e.target.value)
      }/>:
      (
        <div className="content">
        <p>{post.desc}</p>
        <img src={image}  alt="" />
      </div>
      )
      }
      {updateMode && (
      <button className='change' onClick={updateHandler}>Save changes</button>

      )}
    
      <div className="info">
        <div className="item" >
           {onclick={likeHandler} ? <FavoriteOutlinedIcon onClick={ likeHandler} /> :<FavoriteBorderOutlinedIcon onClick={ likeHandler}/>}
           {like} Likes
           
        </div>
        <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
           <SmsOutlinedIcon/>
           {com} Comments
        </div>
           
        <div className="item" onClick={shareHandler}>
          <ReplyAllOutlinedIcon/>
          Share
        </div> 
      </div>
       {commentOpen && <Comments postId={post._id} />}
    
      </div>
    </div>
  )
}

export default Post