import React, { useState, useEffect,useContext } from 'react'
import style from './event.module.css';
import {useNavigate, useParams} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
const EditEvent = () => {
    const {auth,setAuth}=useAuth();
    const [title, setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const handleSelectFile = (e) => {
      setImage(e.target.files[0])
    }
    const handleUpdateEvent = async (e) => {
        e.preventDefault();
      // await axiosPrivate.put('/events/' + id, { title, description, eventDate })
      const res = await axiosPrivate.put('/events/'+id, { title, description, eventDate ,image},{ headers: { "Content-Type": 'multipart/form-data' } });
      
        navigate('/events')
    }

    useEffect(() => {
              axiosPrivate.get('/events/' + id).then(response => {
                  setEventDate(new Date(response.data.event.eventDate).toISOString().slice(0, 10))
                    setTitle(response.data.event.title);
                    setDescription(response.data.event.description);

            })
    },[])
    return (
      <div className={style.layout}>
      <div className={style.flexCol}>
         <div className={style.flex} style={{
          marginBottom: '20px',
          marginTop:'16px'
         }}>
          <h1>Events</h1>
         
        </div>
      <form className={style.form}>
            <div style={style.flexCol}>
              <div className={style.formControl}>
                <label htmlFor="" className={style.label}>Event Title :</label>
                <input type="text" placeholder='Event Title' className={style.textInput} value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <div className={style.formControl}>
                <label htmlFor="" className={style.label}>Event Description :</label>
                 <input type="text" placeholder='Event Description' className={style.textInput} value={description} onChange={(e) => setDescription(e.target.value)}  />
              </div>
              <div className={style.formControl}>
                <label className={style.label}> Event Image :</label>
                 <input type="file" name="image" placeholder='File' onChange={handleSelectFile}/>
              </div>
              <div className={style.formControl}> 
                <label className={style.label}>Event Date :</label>
                            <input type="date" placeholder='Event Title' onChange={(e) => setEventDate(e.target.value)}
                                value={eventDate} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}>
                <button className={style.button} onClick={handleUpdateEvent}>update</button>
              </div>
            </div>
                </form>
            </div>
        </div>
  )
}

export default EditEvent