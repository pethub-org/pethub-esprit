import React from 'react'
import { Link } from 'react-router-dom'
import defaultUserImage from '../../assets/defaultUser.png'
const Friend = ({ friend }) => {
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'space-evenly',backgroundColor:'#000',marginTop:'16px',width:'450px',height:'150px',marginBottom:'16px'}}>
      <div>
        <Link style={{ textTransform: 'capitalize', color: 'white' }} to={"/profile/" + friend._id}>
          {friend.firstname} {' '}{friend.lastname}
        </Link>
      </div>
      <div style={{ width: '90px', height: '90px' }}>
        <Link style={{ textTransform: 'capitalize', color: 'white' }} to={"/profile/" + friend._id}>
        
          <img src={friend?.currentPhoto ? friend?.currentPhoto?.url : defaultUserImage} style={{ width: '100%', height: '100%' }} alt="friend" />
        </Link>
          
      </div>
    </div>
  )
}

export default Friend