import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { format } from 'timeago.js';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';

function Reply({ commentId }) {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [editingReply, setEditingReply] = useState(null);
  const [updatedReply, setUpdatedReply] = useState('');

  const { auth: currentUser } = useAuth()

  useEffect(() => {
    async function fetchReplies() {
      try {
        const response = await axios.get(`/comments/${commentId}/replies/all`);
        setReplies(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReplies();
  }, [commentId]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/comments/${commentId}/reply/create`, {
        content: newReply,
        userId: currentUser._id,
      });
      setReplies((prevReplies) => [...prevReplies, response.data]);
      setNewReply('');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(replyId) {
    try {
      await axios.delete(`/api/comments/${commentId}/reply/${replyId}`);
      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply._id !== replyId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit(reply) {
    setEditingReply(reply._id);
    setUpdatedReply(reply.content);
  }

  async function handleUpdate(replyId) {
    try {
      const response = await axios.put(`/api/comments/${commentId}/reply/${replyId}`, {
        content: updatedReply,
      });
      setReplies((prevReplies) =>
        prevReplies.map((reply) =>
          reply._id === response.data._id ? response.data : reply
        )
      );
      setEditingReply(null);
      setUpdatedReply('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="reply">
      <h4>Replies:</h4>
      <form onSubmit={handleSubmit}>
  <textarea
    value={newReply}
    onChange={(event) => setNewReply(event.target.value)}
    placeholder="write a reply"
    onKeyDown={(event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(event);
      }
    }}
  />

</form>


      <ul>
        {replies.map((reply) => (
          <div className="comment" key={reply._id}>
            <img src={currentUser.profilePicture} alt="User" className="user-image" />
            <div className="info">
              <span>{currentUser.username}</span>
              {editingReply === reply._id ? (
                <>
                  <textarea
                    value={updatedReply}
                    onChange={(event) => setUpdatedReply(event.target.value)}
                    placeholder="Update your reply"
                  />
                  <div className="button-container">
                    <button
                      className="save-button"
                      style={{ fontSize: '15px' }}
                      onClick={() => handleUpdate(reply._id)}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      style={{ fontSize: '15px' }}
                      onClick={() => setEditingReply(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p>{reply.content}</p>
              )}
              <div className="actions">
                <span>{format(reply.createdAt)}</span>
                {currentUser._id === reply.userId && (
                  <>
                    <DeleteOutlineOutlinedIcon
                      className="delete-icon"
                      onClick={() => handleDelete(reply._id)}
                    />
                    <ModeEditOutlineOutlinedIcon
                      className="edit-icon"
                      onClick={() => handleEdit(reply)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Reply;