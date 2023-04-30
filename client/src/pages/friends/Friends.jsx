import React from 'react'
import useAuth from '../../hooks/useAuth'
import Friend from './Friend';

const Friends = () => {
  const { auth } = useAuth();
  return (
    <div style={{ color: 'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column' }}>
      <h1 style={{ marginTop: '16px' }}>Your Friends ({auth?.friendList?.length})</h1>
      <div>
        {auth?.friendList?.map(friend => <Friend key={friend._id} friend={friend}/>)}
      </div>
    </div>
  )
}

export default Friends