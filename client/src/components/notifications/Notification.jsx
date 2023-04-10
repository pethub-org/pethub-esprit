import React, { useEffect, useRef, useState } from 'react'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Img from '../../assets/defaultUser.png'
import './notification.css'
const Notification = () => {
      const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });
    return (
        <div className="container">
              <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={Img}></img>
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem img = {Img} text = {"My Profile"}/>
            <DropdownItem img = {Img} text = {"Edit Profile"}/>
            <DropdownItem img = {Img} text = {"Inbox"}/>
            <DropdownItem img = {Img} text = {"Settings"}/>
            <DropdownItem img = {Img} text = {"Helps"}/>
            <DropdownItem img = {Img} text = {"Logout"}/>
          </ul>
        </div>
      </div>
    </div>  
        </div>

    )
}

export default Notification


function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

