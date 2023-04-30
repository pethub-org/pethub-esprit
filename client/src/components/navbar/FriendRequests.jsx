import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import PeopleIcon from '@mui/icons-material/People';
import styles from './friendRequest.module.css';
const FriendRequests = () => {
  const { auth } = useAuth();
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);

  // useEffect(() => {
  //   axiosPrivate.get('/users/friend-requests',{headers:{Authorization:`Bearer ${auth.token}`}}).then(response => {
  //     setFriendRequests(response.data)
  //   })
  // },[])
  useEffect(() => {
    axiosPrivate.get('/users/friend-requests').then(res => {
        setFriendRequests(res.data)
      })
  }, [showFriendRequests])
  

  return (
    <>
      <div style={{marginLeft:'20px'}} onClick={() => {
        setShowFriendRequests(prev => !prev)
          axiosPrivate.get('/users/friend-requests',{headers:{Authorization:`Bearer ${auth.token}`}}).then(response => {
          setFriendRequests(response.data)
    })
      }} ><PeopleIcon/></div>
      <div style={{marginRight:'60px'}}>
        {showFriendRequests && !friendRequests.length && <div style={{ position: 'fixed', top: '50', right: '20', width: '250px', backgroundColor: 'rgb(69, 69, 69)', padding: '20px', marginRight: '30px' }}>No Friends Requests</div>}
        

        {showFriendRequests && friendRequests.length > 0 && 
            <div style={{position:'fixed',top:'20',overflowY:'visible',right:'20',height:'600px'}}>
     <div style={{ display: 'flex', flexDirection: 'column', width: '300px',height:'max-content ',padding:'12px',overflowY:'visible', backgroundColor: 'rgb(69, 69, 69)' }}>
         {friendRequests?.map(friendRequest => <FriendRequest setShowFriendRequests={setShowFriendRequests} friendRequest={friendRequest} key={friendRequest._id}/> )}
            </div>
        </div>}
      </div>
    </>
  )
}

export default FriendRequests


const FriendRequest = ({ friendRequest,setShowFriendRequests }) => {

  const axiosPrivate = useAxiosPrivate();
  const {setAuth} = useAuth();
  const handleAcceptFriendRequest = async () => {
    
    const res = await axiosPrivate.put('/users/accept-friend/' + friendRequest._id, {});
    const friendRequester = await axiosPrivate.get(`/users/${friendRequest.requester._id}`);
    setAuth(prev => {
      return {
        ...prev,
        friendList:[...prev.friendList,friendRequester.data.user]
      }
    })
    setShowFriendRequests(false)


  }
  const handleDeclineFriendRequest = () => {
    axiosPrivate.put('/users/decline-friend-request/' + friendRequest._id, {}).then(response => {
      console.log({ response })
      setShowFriendRequests(false)
    })
    
  }

  return (
  
    // <div style={{position:'fixed',top:'20',overflowY:'visible',right:'20',height:'600px'}}>
    //  <div style={{ display: 'flex', flexDirection: 'column', width: '250px',height:'600px',padding:'12px',overflowY:'visible', backgroundColor: '#242526' }}>
    //     <div style={{
    //       display: 'flex', justifyContent: 'space-around', alignContent: 'center', backgroundColor: '#c3c3c3', padding: '4px', marginBottom: '5px',
    //       // borderBottom:'2px solid blue'
    //     }}>
    //       <h5>
    //         {friendRequest.requester.firstname} {' '} {friendRequest.requester.lastname}
    //       </h5>
    //      <button onClick={handleAcceptFriendRequest}>accept</button>
    //      <button onClick={handleDeclineFriendRequest}>decline</button>
    //    </div>

    //  </div>
    // </div>
        <div style={{
          display: 'flex', justifyContent: 'space-around', alignItems:'center', backgroundColor: '#c3c3c3', padding: '4px', marginBottom: '5px',
          // borderBottom:'2px solid blue'
      height: '60px',
          
        }}>
          <h5 style={{color:'#222', textTransform:'capitalize', width:'40%',fontSize:'14px'}}>
            {friendRequest.requester.firstname} {' '} {friendRequest.requester.lastname}
          </h5>
        <div style={{width:'60%', display:'flex',alignItems:'center',justifyContent:'center'}}>
          <button className={styles.acceptButton} onClick={handleAcceptFriendRequest}>accept</button>
          <button className={styles.declineButton} onClick={handleDeclineFriendRequest}>decline</button>
         </div>
       </div> 
  )
}


