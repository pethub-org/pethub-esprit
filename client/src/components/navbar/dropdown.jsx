import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import axios from 'axios';
import useAuthContext from '../../hooks/useAuthContext'; 
import NotificationComponent from './NotifcationComponent';

const Dropdown = () => {
    const { currentUser } = useAuthContext()
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/notifications/user/' + currentUser.id, {
      headers: {
        Authorization:'Bearer ' + currentUser.token
      }
    }).then(response => {
      setNotifications([...response.data.notification]);
    });
  },[])

    const handleChange = () => {
        axios.get('http://localhost:8080/notifications/user/'+currentUser.id, {
            headers: {
                Authorization:`Bearer ${currentUser.token}`
            }
           }).then(response => setNotifications(response.data.notifications))
    }

    // run this effect every time a new notification event is emmited && on first render
    // refetch notifications
    // show number of notification has not been seen
    // onClick on notification make put request to update to seen
  
  // const menuItems = notifications.map(notification => {

  // })
  const notifs = notifications?.map(notif => 
     <NotificationComponent notification={notif}/>
    )
  return (
  
    <FormControl fullWidth style={{
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
       
    
      >
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        {/* <NotificationComponent/>
        <NotificationComponent/>
        <NotificationComponent/>
        <NotificationComponent/>
        <NotificationComponent/>
        <NotificationComponent/>
        <NotificationComponent/>
        <NotificationComponent/>
        <NotificationComponent/> */}
        {notifs}
      </Select>
    </FormControl>
  )
}

export default Dropdown



