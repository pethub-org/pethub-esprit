import React, { useEffect } from 'react'
import style from './notificationComponent.module.css';
import PorfilePicture from '../../assets/defaultUser.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const URL = 'http://localhost:8080';

const NotificationComponent = (notification) => {
  const {currentUser} = useAuthContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    // update notifcation status to seen
    axios.put(`${URL}/notifications/` + notification._id, {}, {
      headers: {
      Authorization:'Bearer ' + currentUser.token
    }}); 

    // navigate to the post or comment related to the notification
    if (notification.type === 'comment') {
      navigate(`/comments/${notification.content}`)
    } else if(notification.type === 'post') {
      navigate(`/posts/${notification.content}`)
    }
    if (notification.type === 'request') {
      
    }

  }
  
  const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "CET",
  timeZoneName: "short",  
};
  
  const formatedDate = new Intl.DateTimeFormat(undefined, { options }).format(new Date(notification.notification.createdAt));


  return (
    <div className={style.container} onClick={handleClick}>
      <div>
         <img src={PorfilePicture} alt="profile pic" className={style.img} />
      </div>
      <div className={style.informations}>
        <p><span className={style.username}>{notification.notification.sender.firstname}</span> : liked your post</p>
        <span>{formatedDate}</span>
        <small style={{alignSelf:'end'}}>{notification.notification.seen ? 'seen' : ''}</small>
      </div>
    </div>
  )
}

export default NotificationComponent