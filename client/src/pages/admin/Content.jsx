import React,{useState ,useEffect,useContext} from 'react'
import './style.css'
import { AuthContext } from '../../context/authContext';
import User from './User';
import Header from './Header'



const Content = ({users,setUsers}) => {
 
  
  return (
    <div style={{marginBottom:'30px'}}>
    
        <Header/>

      <section className="home-section" style={{backgroundColor:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>

        <div className='cart'>
     
        <table className="table">
        <thead>
    <tr>
      <th scope="col" >Email</th>
      <th scope="col">Firstname</th>
      <th scope="col">Lastname</th>
      <th scope="col">Role</th>
      <th scope="col">Banned</th>
      <th scope="col">Confirmed</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
            <tbody>
              {users.map((user) => <User key={user._id} user={user} users={users} setUsers={setUsers} />)}
  </tbody>
  </table>
      </div>
  </section>
    
    </div>
  )
}

export default Content