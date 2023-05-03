import React from 'react'
import useAuth from '../../hooks/useAuth'
import Friend from './Friend';

const Friends = () => {
  const { auth } = useAuth();
  return (
    <div style={{ color: 'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column' }}>
      <h1 style={{ marginTop: '16px' }}>Your Friends ({auth?.friendList?.length})</h1>
      <div>
        {auth?.friendList?.length > 0 && auth?.friendList?.map(friend => <Friend key={friend._id} friend={friend}/>)}
        {!auth?.friendList?.length && <h6 style={{fontSize:'28px',marginTop:'60px'}}>You don't have friends yet.</h6>}
      </div>
    </div>
  )
}

export default Friends