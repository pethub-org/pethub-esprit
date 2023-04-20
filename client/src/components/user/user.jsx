import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'


const User = ({person}) => {
const {user:currentUser} = useContext(AuthContext)
const handleFollow = (userId) => {
  axios.post(`/${userId}/follow`)
    .then(response => {
      // handle successful follow action
    })
    .catch(error => {
      // handle error
    });
}
  return (
    <div className='follower'>
                <div>
                  <img src={person.profilePicture} alt=""  className='followerImg'/>
                  <div className="name">
                    <span>{person.username }</span>
                  </div>
                </div>
                <button className='button' onClick={() => handleFollow(currentUser.id)}>
                  Follow
                </button>
              </div>
  )
}

export default User
