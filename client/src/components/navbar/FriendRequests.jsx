import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const FriendRequests = () => {
  const { auth } = useAuth();
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);

  // useEffect(() => {
  //   axiosPrivate.get('/users/friend-requests',{headers:{Authorization:`Bearer ${auth.token}`}}).then(response => {
  //     setFriendRequests(response.data)
  //   })
  // },[])
  return (
    <>
      <button onClick={() => {
        setShowFriendRequests(prev => !prev)
          axiosPrivate.get('/users/friend-requests',{headers:{Authorization:`Bearer ${auth.token}`}}).then(response => {
          setFriendRequests(response.data)
    })
      }} >Friend Requests</button>
      <div>
        { showFriendRequests && !friendRequests.length && <div style={{position:'fixed',top:'20',width:'250px',backgroundColor:'#c3c3c3',padding:'20px'}}>No Friends Requests</div>}
        {showFriendRequests && friendRequests.length> 0 &&friendRequests?.map(friendRequest => <FriendRequest friendRequest={friendRequest} key={friendRequest._id}/> )}
      </div>
    </>
  )
}

export default FriendRequests


const FriendRequest = ({ friendRequest }) => {
  const axiosPrivate = useAxiosPrivate();
  const {setAuth} = useAuth();
  const handleAcceptFriendRequest = () => {
    axiosPrivate.put('/users/accept-friend/' + friendRequest._id, {}).then(response => {
      console.log({ response })
      setAuth(prev => {
        return {
          ...prev,
          friendList:[...prev.friendList,friendRequest.requester._id]
        } 
      })
    })
  }
  const handleDeclineFriendRequest = () => {
    axiosPrivate.put('/users/decline-friend-request/' + friendRequest._id, {}).then(response => {
      console.log({response})
    })
  }

  return (
  
    <div style={{position:'fixed',top:'20',overflowY:'visible'}}>
     <div style={{ display: 'flex', flexDirection: 'column', width: '250px',height:'max-content',overflowY:'visible', backgroundColor: '#242526' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-around', alignContent: 'center', backgroundColor: '#c3c3c3', padding: '4px', marginBottom: '5px',
          borderBottom:'2px solid blue'
        }}>
         {friendRequest.requester.firstname} {' '} {friendRequest.requester.lastname}
         <button onClick={handleAcceptFriendRequest}>accept</button>
         <button onClick={handleDeclineFriendRequest}>decline</button>
       </div>
     </div>
    </div>
  )
}