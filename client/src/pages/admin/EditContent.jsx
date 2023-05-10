import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';


const EditContent = () => {
    const { id } = useParams();
    const { auth } = useAuth()
    const navigate = useNavigate();
    const [editUser, setEditUser] = useState({
        email: "",
        firstname: "",
        lastname:""
    })
    const axios = useAxiosPrivate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
            const response = await axios.put(`/users/admin/update/user/${id}`, {
            email: editUser.email,
            firstname: editUser.firstname,
            lastname: editUser.lastname
            });
            toast.success(`User updated!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } catch (error) {
         toast.error(`Something went wrong while updating user !`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        
    }
        
        //  await refreshUser();
        // console.log({ response })
        // TODO : refresh local state
        // setAuth()
    }

    useEffect(() => {
         if (auth.role !== 'admin') {
            navigate('/login')
        }
         axios.get(`/users/${id}`, {}).then((res) => {
                //  console.log({ res });
                 setEditUser(res.data.user)
            })
  
    },[])
    
    return (
        <div style={{backgroundColor:'#fff',width:'100vw',height:'100vh' ,overflow:'hidden'}}>
            <Header />
            <div style={{width:'1px',height:'1px',borderBottom:'1px solid black'}}></div>
      
    <section className="home-section" style={{backgroundColor:'#fff',overflow:'hidden'}}>

    <div className='cart'>
        <div className="container" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <div className="form-group" style={{marginTop:'30px'}}>
                <label htmlFor='exampleInputEmail1' style={{marginRight:'16px'}}>Email :</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                          
                                style={{marginLeft:'20px',width:'250px',height:'35px',padding:'12px'}}
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
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            <div className="form-group" style={{marginTop:'30px'}}>
                <label htmlFor="firstname">Firstname:</label>
                      <input type="text" className="form-control" id="firstname" placeholder="Firstname"
                                value={editUser.firstname}
                                style={{marginLeft:'16px',width:'250px',height:'35px',padding:'12px'}}
                          onChange={(e) => {
                          setEditUser((prev) => {
                              return {
                                  ...prev,
                                  firstname:e.target.value
                              }
                          })
                }}/>
                  </div>
                  
            <div className="form-group" style={{marginTop:'30px'}}>
                <label htmlFor="lastname">Lastname:</label>
                      <input type="text" className="form-control" id="lastname" placeholder="Lastname"
                                value={editUser.lastname}   
                                style={{marginLeft:'16px',width:'250px',height:'35px',padding:'12px'}}
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
           
            <button onClick={handleSubmit} style={{marginTop:'30px'}} className="btn btn-primary">Save Changes</button>
     
       </div>
    </div>
    </section>
</div>
  )
}

export default EditContent