import './Post.scss'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import {Link} from 'react-router-dom'
import Comments from '../comments/Comments'
import { useState } from 'react';
const Post = ({post}) => {
  const [like,setLike] = useState(post.like)
  const [islike,setIsLike] = useState(false)
  //temporaire like 
  const liked =false;
  const likeHandler = ()=>{
    setLike(islike ? like-1 : like+1)
    setIsLike(!islike)
    
  }
  const [commentOpen, setCommentOpen]= useState(false);
  

  return (
    <div className='post'>
      <div className="container">
      <div className="user">
        <div className="userInfo">
           <img src={post.profilePic} alt="" />
           <div className="details">
            <Link to={`/profile/${post.userId}`}  style={{textDecoration:"none",color:"inherit"}}>
                <span className='name'>{post.name}</span>
               
            </Link>
            <span className='date'>1 min ago</span>
           </div>
        </div>
        <MoreHorizRoundedIcon/>

      </div>
      <div className="content">
        <p>{post.desc}</p>
        <img src={post.img} alt="" />
      </div>
      <div className="info">
        <div className="item" >
           {liked ? <FavoriteOutlinedIcon onClick={ likeHandler} /> :<FavoriteBorderOutlinedIcon onClick={ likeHandler}/>}
           {like}Likes
        </div>
        <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
           <SmsOutlinedIcon/>
           10 Comments
        </div>
           
        <div className="item">
          <ReplyAllOutlinedIcon/>
          Share
        </div> 
      </div>
       {commentOpen && <Comments />}
    
      </div>
    </div>
  )
}

export default Post