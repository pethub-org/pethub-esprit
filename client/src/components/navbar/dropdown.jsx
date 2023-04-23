import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationComponent from './NotifcationComponent';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import NotificationList from './NotificationList';
import styles from './notifcations.module.css';


const Dropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifcations,setShowNotifcations] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth()
  
  const getUserNotifcations = async () => {
    const response = await axiosPrivate.get('/notifications/user/' + auth._id);
    setNotifications(response.data)

  }

  
    const handleChange = () => {
        axiosPrivate.get('/notifications/user/'+auth._id, {}).then(response => {
          setNotifications(response.data.notifications)
          console.log({response})
        })
    }

    // run this effect every time a new notification event is emmited && on first render
    // refetch notifications
    // show number of notification has not been seen
    // onClick on notification make put request to update to seen
  
  // const menuItems = notifications.map(notification => {

  // })

    
    // TODO : on click on the button fetch user notifcations
  return (
    <div>
      <button onClick={async() => {
        await getUserNotifcations();
        setShowNotifcations(prev => !prev)
     }}>
      Notifications
          {/* <FormControl fullWidth style={{
          color: 'white',
          
        }}  >
          <InputLabel id="demo-simple-select-label" style={{
            color: 'white',
          }}>
            <NotificationsOutlinedIcon />
          </InputLabel>
          <Select
      
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={'18'}
            label="Age"
            onChange={handleChange}
          
        
          > */}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
    
            {/* {notifs}
          </Select>
        </FormControl> */}
      </button>
      {showNotifcations && <NotificationList notifications={notifications} setNotifications={setNotifications}/>}
    </div>
   
  )
}

export default Dropdown



