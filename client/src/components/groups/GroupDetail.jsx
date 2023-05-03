import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./detail.scss"
import Feed from "../feed/feed"
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
const GroupDetail = ({ groupId }) => {
  const [group, setGroup] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  useEffect(() => {
    const fetchGroup = async () => {
      const res = await axios.get(`http://localhost:8080/api/groups/${groupId}`);
      setGroup(res.data);
    };
    fetchGroup();
  }, [groupId]);

  if (!group) {
    return <div>Loading...</div>;
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
      <button
        style={{  backgroundColor: isJoined ? 'gray' : '#5271ff', color: 'white', borderRadius: '13px', fontSize: '15px' }}
        onClick={handleJoinClick}
      >
        <GroupsOutlinedIcon />
        {isJoined ? 'Leave the group' : 'Join the group'}
      </button>      </div>
      <hr/>
      <Feed/>
    </div> 
    
  
    
  );
};

export default GroupDetail;
