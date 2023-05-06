import React, { useState, useEffect } from 'react';
import "./list.scss"
import Feed from "../feed/feed"
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const GroupDetail = ({ groupId }) => {
  const [group, setGroup] = useState(null);
  const {auth:currentUser} = useAuth()
  const [isJoined, setIsJoined] = useState(group?.members?.includes(currentUser?._id));
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchGroup = async () => {
      const res = await axios.get(`http://localhost:8080/api/groups/${groupId}`);
      setGroup(res.data);
    };
    fetchGroup();
  }, [groupId]);

  if (!group) {
    return <div style={{color:"white"}}>Loading...</div>;
  }
  const handleFollow = async(userId) => {
    await axios.put(`http://localhost:8080/api/groups/${userId}/join`, {userId: currentUser._id})
      .then(response => {
        setIsJoined(true)
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handleUnfollow = async(userId) => {
    await axios.put(`http://localhost:8080/api/groups/${userId}/unfollow`, {userId: currentUser?._id})
      .then(response => {
        setIsJoined(false)
      })
      .catch(error => {
        console.log(error)
      });
  }



  const handleJoinClick = () => {
    setIsJoined(!isJoined);
  };

  return (
    <div className='group-detail'>
      
      <img src={group.image || 'https://www.akc.org/wp-content/uploads/2019/06/Top-Travel-Products-for-Dogs.jpg'} alt={group.name} 
        style={{
          borderRadius:"20px",
          width: "100%",
          height: "250px",
          objectFit: "cover",
        
        }}
      />
      <div className='btn' style={{display:"flex", justifyContent:"space-around" ,marginTop:"15px"}}>
      <h2    style={{borderRadius:"20px",marginLeft:"-30px", color:"white" , textTransform:"capitalize"}}>{group.name}</h2>
      <button className='btn'
        style={{  backgroundColor: isJoined ? 'gray' : '#5271ff', color: 'white', borderRadius: '13px', fontSize: '15px' }}
        onClick={handleJoinClick}
      >
        <GroupsOutlinedIcon />
        {isJoined ? (
        <button className='button'  onClick={handleFollow} style={{backgroundColor:"grey",color:'white' }}>
          Leave the group
        </button>
      ) : (
        <button   style={{backgroundColor:"transparent", border:"none" }} onClick={handleUnfollow}>
          Join The group
        </button>
      )}
      </button>      </div>
      <hr/>
      <Feed/>
      
    </div> 
    
  
    
  );
};

export default GroupDetail;
