import React,{useState ,useEffect,useContext} from 'react'
import './style.css'
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import User from './User';
import Header from './Header'

const BASE_URl = 'http://localhost:8080'


const Content = ({users,setUsers}) => {
 
  
  return (
   
      <section className="home-section">
        <Header/>

        <div className='cart'>
     
        <table className="table">
        <thead>
    <tr>
      <th scope="col">Email</th>
      <th scope="col">Firstname</th>
      <th scope="col">Lastname</th>
      <th scope="col">role</th>
      <th scope="col">ban</th>
      <th scope="col">confirmed</th>
      <th scope="col">actions</th>
    </tr>
  </thead>
            <tbody>
              {users.map((user) => <User key={user._id} user={user} users={users} setUsers={setUsers} />)}
  </tbody>
  </table>
      </div>
  </section>
  )
}

export default Content