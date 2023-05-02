import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './list.scss';
import GroupDetail from './GroupDetail';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import useAuth from '../../hooks/useAuth';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
 const {auth:currentUser} =useAuth()
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get('http://localhost:8080/api/groups/all');
      setGroups(res.data);
    };
    fetchGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    try {
      await axios.put(`http://localhost:8080/api/groups/join/${groupId}`);
      // Refresh the group list
      const res = await axios.get('http://localhost:8080/api/groups/all');
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
      <h2>Suggestions Groups</h2>
      <div className="group-container">
        
        {groups.map((group) => (
          <div className="group-card" key={group._id} onClick={() => setSelectedGroupId(group._id)}>
            <img className="group-image" src={group.image || 'https://www.akc.org/wp-content/uploads/2019/06/Top-Travel-Products-for-Dogs.jpg'} alt={group.name}
             
            />
            <div className="group-name">{group.name}</div>
            <span style={{
                      marginTop: "5px",
                      fontSize: "0.8rem",
                      color: "#999",
                      display: "flex",
                      alignItems: "center",
                      marginLeft:"25px"
            }}> 1.1K Members . 8 posts per day</span>
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
