import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationComponent from './NotifcationComponent';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Dropdown = () => {
    const { auth} = useAuth()
  const [notifications, setNotifications] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    axiosPrivate.get('/notifications/user/' + auth._id, {}).then(response => {
      console.log(response)
      setNotifications([...response.data]);
    });
  },[])

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
  const notifs = notifications.length > 0 ?
    notifications.map(notif => <NotificationComponent notification={notif} setNotifications={setNotifications} key={notif._id} />
    )
    : <p style={{padding:'20px'}}>You dont have notifcations yet !</p>
    
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



