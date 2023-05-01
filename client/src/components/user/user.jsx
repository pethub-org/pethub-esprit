import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth';

const User = ({person}) => {
  const {user:currentUser} = useAuth()
  const [isFollowed, setIsFollowed] = useState(person.followers.includes(currentUser._id))

  const handleFollow = async() => {
    await axios.put(`/api/users/${person._id}/follow`, {userId: currentUser._id})
      .then(response => {
        setIsFollowed(true)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handleUnfollow = async() => {
    await axios.put(`/api/users/${person._id}/unfollow`, {userId: currentUser._id})
      .then(response => {
        setIsFollowed(false)
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <div className='follower'>
      <div>
        <img src={person.profilePicture} alt="" className='followerImg'/>
        <div className="name">
          <span>{person.username }</span>
        </div>
      </div>
      {isFollowed ? (
        <button className='button' onClick={handleUnfollow} style={{backgroundColor:"red"}}>
          Unfollow
        </button>
      ) : (
        <button className='button' onClick={handleFollow}>
          Follow
        </button>
      )}
      
    </div>
    
  )
}

export default User
