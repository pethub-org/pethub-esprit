import { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import './comments.scss'
import { format } from 'timeago.js'
// import { AuthContext } from '../../context/AuthContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import Reply from './Reply';
import { Link } from 'react-router-dom'
import defaultUser from '../../assets/defaultUser.png';

import SendIcon from '@mui/icons-material/Send';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState('');
  const [showReplies, setShowReplies] = useState({});
  const [likedComments, setLikedComments] = useState([]);
  const [like, setLike] = useState('')
  const [islike, setIsLike] = useState(false)

  // const { user: currentUser } = useContext(AuthContext)
  const { auth: currentUser } = useAuth()
  const axios = useAxiosPrivate();

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`/api/comments/posts/${postId}/all`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
  }, [postId]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post('/api/comments/create', {
        content: newComment,
        postId,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  }

  //delete 
  async function handleDelete(commentId) {
    try {
      const response = await axios.delete(`/api/comments/delete/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== response.data._id)
      );
    } catch (error) {
      console.error(error);
    }
  }
  //update 
  async function handleEdit(comment) {
    setEditingComment(comment._id);
    setUpdatedComment(comment.content);
  }
  async function handleUpdate(commentId) {
    try {
      const response = await axios.put(`/api/comments/${commentId}`, {
        content: updatedComment,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === response.data._id ? response.data : comment
        )
      );
      setEditingComment(null);
      setUpdatedComment('');
    } catch (error) {
      console.error(error);
    }
  }
  //show replies
  function toggleReplies(commentId) {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
  }
  //like 
  async function handleLike(commentId) {
    try {
      const response = await axios.put(`/api/comments/${commentId}/like`, {
        userId: currentUser._id,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === response.data._id ? response.data : comment
        )
      );
      setLikedComments((prevLikedComments) => {
        if (prevLikedComments.includes(commentId)) {
          return prevLikedComments.filter((id) => id !== commentId);
        } else {
          return [...prevLikedComments, commentId];
        }
      });
    } catch (error) {
      console.error(error);
    }
    setLike(islike ? like - 1 : like + 1)
    setIsLike(!islike)
  }

  return (
    <div className='form-container'>
      <h2>All Comments</h2>

      <form onSubmit={handleSubmit}>
        <input
          style={{
            padding: '15px',
            borderRadius: '15px',
            marginTop: '5px',
            marginLeft: '6px',
            marginBottom:'10px',
            width: '100%',
            height:'55px',
            border:"none",
            opacity: "0.9"
          }}
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder='write a comment'
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              handleSubmit(event);
            }
          }}
        />
      </form>


      <ul>
        {comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <Link to={`/profile/${comment.userId}`}>
            <img src={currentUser.currentPhoto ? currentUser.currentPhoto.url : defaultUser} alt={currentUser.firstname}  />
            </Link>
            <div className='info'>
              <span style={{ fontSize: "15px",textTransform:"capitalize" }}>{currentUser?.firstname} {' '}{currentUser?.lastname} </span>
              {editingComment === comment._id ? (
                <>
                  <input
                    value={updatedComment}
                    onChange={(event) => setUpdatedComment(event.target.value)}
                    placeholder='Update your comment'
                    style={{
                      padding: '15px',
                      borderRadius: '15px',
                      marginTop:'6px',
                      opacity:"0.9",
                      border:"none",
                     
                    }} 
                  />
                  <div className='button-container' style={{marginTop:"-5px"}}>
                    <button className='save-button' style={{ fontSize: "15px" }} onClick={() => handleUpdate(comment._id)}>
                      Save
                    </button>
                    <button className='cancel-button' style={{ fontSize: "15px" }} onClick={() => setEditingComment(null)}>
                      Cancel
                    </button>
                  </div>
                </>

              ) : (
                <>
                  <p>{comment.content}</p>
                  
                  
                </>
                
              )}
            
            </div>
            
            <span className='date' style={{ marginLeft: "10px", marginRight:"20px"}}>{format(comment.createdAt)}</span>

            <div className="likes" style={{marginTop:"-20px"}}>
              <button className="like-button" onClick={() => handleLike(comment._id)}>
                {likedComments.includes(comment._id) ? (
                  <span style={{ color: 'red' }} > <FavoriteOutlinedIcon/> </span>
                ) : (
                  <span style={{ color: 'white' }}><FavoriteBorderOutlinedIcon/> </span>

                )}

              </button>
              <button onClick={() => toggleReplies(comment._id)} style={{ fontSize: "15px", backgroundColor: "#222", color: "white" }}><QuickreplyOutlinedIcon/></button>
            <button onClick={() => handleEdit(comment)} style={{ fontSize: "15px", backgroundColor: "#222", color: "white" }}>
              <ModeEditOutlineOutlinedIcon/></button>
            <button onClick={() => handleDelete(comment._id)} style={{ fontSize: "15px", backgroundColor: "#222", color: "white" }}><DeleteOutlineOutlinedIcon/></button>
            {showReplies[comment._id] && <Reply commentId={comment._id} />}
            
            </div>
           
         
            
            
           

          </div>


        ))}
       
      </ul>
     
    </div>
    
   
    
  );
  
}

export default Comments;
