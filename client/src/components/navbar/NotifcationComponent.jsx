import React, { useEffect } from 'react'
import style from './notificationComponent.module.css';
import defaultPicture from '../../assets/defaultUser.png'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';


const NotificationComponent = ({notification,setNotifications}) => {
  
  const {auth} = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    // update notifcation status to seen
    axiosPrivate.put(`/notifications/` + notification._id, {}); 
    
    // TODO : update notifications array with new data (seen notification)
    // setNotifications(prev => {
    //   const currentNotificationIndex = prev.find(n => n._id === notification._id);
    //   prev[currentNotificationIndex] = {
    //     ...prev[currentNotificationIndex],
    //     seen:true
    //   }

    //   return [...prev]
    // })


    // navigate to the post or comment related to the notification
    if (notification.type === 'comment') {
      navigate(`/post/${notification.content}`)
    } else if(notification.type === 'like') {
      navigate(`/post/${notification.content}`)
    }
  

  }
  
  const options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "CET",
  timeZoneName: "short",  
};
  
  const formatedDate = new Intl.DateTimeFormat(undefined, { options }).format(new Date(notification.createdAt));


  return (
    <div className={style.container} style={{cursor:'pointer'}} onClick={handleClick}>
      <div>
         <img src={defaultPicture} alt="profile pic" className={style.img} />
      </div>
      <div className={style.informations}>
        <p style={{fontSize:'12px'}}><span style={{fontSize:'12px',textTransform:'capitalize'}} className={style.username}>{notification.sender.firstname}</span> : {notification.type === 'like' ? 'Liked Your Post' : 'Commented On Your Post'}</p>
        <span>{formatedDate}</span>
        <small style={{alignSelf:'end',color:'black',fontSize:'10px',fontWeight:'600'}}>{notification.seen ? 'seen' : 'Not seen'}</small>
      </div>
    </div>
  )
}

export default NotificationComponent