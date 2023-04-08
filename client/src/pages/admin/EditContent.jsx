import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const BASE_URL = 'http://localhost:8080'

const EditContent = () => {
    const { id } = useParams();
    const { currentUser ,refreshUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const [editUser, setEditUser] = useState({
        email: "",
        firstname: "",
        lastname:""
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`${BASE_URL}/users/admin/update/user/${id}`, {
            email: editUser.email,
            firstname: editUser.firstname,
            lastname:editUser.lastname
        },
            {
                headers: {
                    'Authorization': `${currentUser.token}`
                }
            }
        )
         await refreshUser();
        console.log({response})
    }

    useEffect(() => {
         if (currentUser.role !== 'admin') {
            navigate('/login')
        }
         axios.get(`${BASE_URL}/users/${id}`, {},
        {
            headers: {
                'Authorization': `${currentUser.token}`
            }
             }).then((res) => {
                 console.log({ res });
                 setEditUser(res.data)
            })
  
    },[])
    
  return (
    <section className="home-section">
        <Header/>

    <div className='cart'>
              <div className="container">
                   <form>
            <div className="form-group">
                <label htmlFor='exampleInputEmail1'>Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                          value={editUser.email}
                          onChange={(e) => {
                              setEditUser((prev) => {
                                  return {
                                      ...prev,
                                      email:e.target.value
                                  }
                              })
                          }}
                      />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="firstname">Firstname</label>
                      <input type="text" className="form-control" id="firstname" placeholder="Firstname"
                        value={editUser.firstname}
                          onChange={(e) => {
                          setEditUser((prev) => {
                              return {
                                  ...prev,
                                  firstname:e.target.value
                              }
                          })
                }}/>
                  </div>
                  
            <div className="form-group">
                <label htmlFor="lastname">Lastname</label>
                      <input type="text" className="form-control" id="lastname" placeholder="Lastname"
                        value={editUser.lastname}   
                       onChange={(e) => {
                          setEditUser((prev) => {
                              return {
                                  ...prev,
                                  lastname:e.target.value
                              }
                          })
                }}
                      />
            </div>
           
            <button onClick={handleSubmit} className="btn btn-primary">Save Changes</button>
        </form>
     
       </div>
    </div>
    </section>
  )
}

export default EditContent