import React from 'react'
import NotificationComponent from './NotifcationComponent'

const NotificationList = ({notifications,setNotifications}) => {
    if (notifications?.length > 0)
        return (
            <div style={{position:'fixed',top:'20', overflowY:'visible', background:'#454545',marginRight:'40px' , padding:'10px'}}>
                {notifications.map(notif => <NotificationComponent notification={notif} setNotifications={setNotifications} key={notif._id} />)}
            </div>
        )
    
    else {
           return     <p style={{ position:'fixed',top:'20', overflowY:'visible',padding: '20px',width:'250px',backgroundColor:'#c3c3c3' }}>You dont have notifcations yet !</p>;
    }
    
 
}

export default NotificationList