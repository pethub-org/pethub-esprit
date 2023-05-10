import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './list.scss';
import GroupDetail from './GroupDetail';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import useAuth from '../../hooks/useAuth';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const { auth: currentUser } = useAuth()
  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get('/api/groups/all');
      setGroups(res.data);
    };
    fetchGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      await axios.put(`/api/groups/${groupId}/join`);
      // Refresh the group list
      const res = await axios.get('/api/groups/all');
      setGroups(res.data);
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };
  

  if (selectedGroupId) {
    return <GroupDetail groupId={selectedGroupId} />;
  }

  return (
    <div className="group-list">
      <h2 style={{marginTop:"20px" , marginLeft:"20px"}}><GroupsOutlinedIcon/> Suggestions Groups</h2>
      <div className="group-container">
        
        {groups.map((group) => (
          <div className="group-card" key={group._id} onClick={() => setSelectedGroupId(group._id)}>
            <img className="group-image" src={group.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXdsw7q7Auc2X53ltV3ylXL8KhTPwAyE_zNmAP4JI3jSoF_lT-o0kPbXa0ZfdAJl5k_6Q&usqp=CAU'} alt={group.name}
             
            />
            <div className="group-name">{group.name}</div>
     
            <span style={{
                      marginTop: "5px",
                      fontSize: "0.8rem",
                      color: "#999",
                      display: "flex",
                      alignItems: "center",
                      marginLeft:"25px"
            }}> {group.members.length} Members . 8 posts per day</span>
            {group.members.includes(currentUser._id) ? (
              <button disabled>Already a Member</button>
            ) : (
              <button onClick={() => handleJoinGroup(group._id)}>Join the Group</button>
            )}
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default GroupList;