import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './comments.scss'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import SendIcon from '@mui/icons-material/Send';
import Reply from './Reply';
function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState('');
  const [showReplies, setShowReplies] = useState({});

  const { user: currentUser } = useContext(AuthContext)

  

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`/comments/posts/${postId}/all`);
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
      const response = await axios.post('/comments/create', {
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
      const response = await axios.delete(`/comments/delete/${commentId}`);
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
      const response = await axios.put(`/comments/${commentId}`, {
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

  return (
    <div className='form-container'>
      <h2>Comments</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder='write a comment'
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              handleSubmit(event); // call your submit function when Enter is pressed
            }
          }}
        />
      </form>


      <ul>
        {comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <img src={currentUser.profilePicture} alt="User" className="user-image" />
            <div className='info'>
              <span>{currentUser.username}</span>
              {editingComment === comment._id ? (
                <>
                  <textarea
                    value={updatedComment}
                    onChange={(event) => setUpdatedComment(event.target.value)}
                    placeholder='Update your comment'
                  />
                  <div className='button-container'>
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
            <button onClick={() => toggleReplies(comment._id)} style={{ fontSize: "10px" }}><QuickreplyOutlinedIcon /></button>
            <span className='date'>{format(comment.createdAt)}</span>
            <button onClick={() => handleEdit(comment)} style={{ fontSize: "15px" }}><ModeEditOutlineOutlinedIcon /></button>
            <button onClick={() => handleDelete(comment._id)} style={{ fontSize: "10px" }}><DeleteOutlineOutlinedIcon /></button>
            {showReplies[comment._id] && <Reply commentId={comment._id} />}
          </div>
          
        
        ))}
      </ul>

    </div>
  );
}

export default Comments;
