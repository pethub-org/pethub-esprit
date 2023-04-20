import {  useContext, useEffect, useState } from 'react'
import User from '../user/user'
import './rightBar.scss'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { followers } from '../../dataFollowers/followersdata';
const RightBar = () => {

  const {user:currentUser} = useContext(AuthContext)
  const [persons, setPersons] = useState([]);

  useEffect(()=>{
    const fetchUser = async()=>{
      const {data} = await axios.get("/users/");
      setPersons(data)
      console.log(data)
    }
    fetchUser()
  },[]);
  return (
    <div className='rightBar'>
      <div className="container">
         <div className="item">
          <span>
            Suggestions For You
          </span>
          
          {persons.map((person, id) => {
        if (person._id !== currentUser._id) return <User person={person} key={id} />;
      })}
     
     
         
        
         </div>
       
        
      </div>
    </div>
  )
}

export default RightBar