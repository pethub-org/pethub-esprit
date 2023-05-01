import React, { useContext, useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = ({ person }) => {
  // console.log({person})
  const { auth: currentUser } = useAuth();

  const [isFollowed, setIsFollowed] = useState(person?.followers?.includes(currentUser?._id))
  const axios = useAxiosPrivate();

  const handleFollow = async() => {
    await axios.put(`/users/${person._id}/follow`, {userId: currentUser._id})
      .then(response => {
        setIsFollowed(true)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handleUnfollow = async() => {
    await axios.put(`/users/${person?._id}/unfollow`, {userId: currentUser?._id})
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
        <img src={person?.currentPhoto} alt="" className='followerImg'/>
        <div className="name">
          <span>{person?.firstname }{' '} {person?.lastname}</span>
        </div>
      </div>
      {isFollowed ? (
        <button className='button'  onClick={handleUnfollow} style={{backgroundColor:"grey",color:'white'}}>
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
