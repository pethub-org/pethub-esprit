import React, { useContext, useEffect, useId, useState } from 'react'
import style from "./event.module.css"
import EventImage from '../../assets/event_img.jpg'
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Event = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const id = useId()

  const navigate = useNavigate();

  // TODO: fix me 
  // const [buttonText, setButtonText] = useState('');
  // const [clickHandler,setClickHanlder] = useState();
  
  const { currentUser } = useContext(AuthContext);

  const handleToggleForm = () => setToggleForm(prev => !prev);

  const handleEditEvent = async(event) => {
      navigate('/events/'+event._id)
  }
  const handleDeleteEvent = async(event) => {
     axios.delete('http://localhost:8080/events/' + event._id, {
      headers: {
        Authorization:`Bearer ${currentUser.token}`
      }
    }).then(res => console.log({res}))
  }
  // TODO : fix me
  // const customClickHandler =async (event,isParticipated) => {
  //   if (isParticipated) {
  //     await handleParticipate(event)
  //     setClickHanlder(handleUnparticipate)
  //     setButtonText('Leave')
  //   } else {
  //     await handleUnparticipate(event);
  //     setClickHanlder(handleParticipate);
  //     setButtonText('Participate');
  //   }
  // } 
  const handleParticipate = async (event) => {
    const response = await axios.put(`http://localhost:8080/events/participate/${event._id}`, {}, {
      headers: {
          Authorization:`Bearer ${currentUser.token}`
        }
    })
    console.log(response)
  }

  const handleUnparticipate = async (event) => {
    const response = await axios.put(`http://localhost:8080/events/unparticipate/${event._id}`, {}, {
      headers: {
          Authorization:`Bearer ${currentUser.token}`
        }
    })
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const source = axios.CancelToken.source()
    const config = {cancelToken:source.token}
    const res = await axios.post('http://localhost:8080/events', { title, description, eventDate }, {
      config,
      headers: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
    setTitle('')
    setDescription('')
    setEventDate('')
  }
  useEffect(() => {
    const source = axios.CancelToken.source()
    const config = {cancelToken:source.token}
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:8080/events',config)
      setEvents(response.data.events)
    }
    fetchEvents()

     return () => {
      source.cancel('Request canceled by user.');
    };
  }, [toggleForm])
    
  const renderEvents = events.map((event, i) => {
    const formatedDate = new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date(event.eventDate));
    const isParticipated = event.participants.find((id) => id === currentUser.id)

    const button = !isParticipated ?
          <button className={style.button} key={event._id} onClick={() => handleParticipate(event)}>Pariticipate</button>
      : <button className={style.button} key={event._id} onClick={() => handleUnparticipate(event)}>Leave</button>

    const isMyEvent = event.creatorId === currentUser.id 
    const actionButtons = isMyEvent ?
      <>
       <button className={style.button} key={event._id} onClick={() => handleEditEvent(event)}> Edit</button>
       <button className={style.button} key={id} onClick={() => handleDeleteEvent(event)}> Delete</button>
      </>
      : null;
    return (
    <div className={style.flex}>

      <div className={style.item}>
        <img src={EventImage} alt="img" className={style.img} />
        <span className={style.date}>{formatedDate}</span>
        <p className={style.title}>{event.title}</p>
          <p className={style.description}>{event.description}</p>
            {isMyEvent ? actionButtons : button}
        
      </div>

     </div>
      )
    
      {/* <div className={style.item}>
                  <img src={EventImage} alt="img" className={style.img} />
                  <span className={style.date}>SAT, APR 15 AT 8 PM</span>
                  <p className={style.title}>Ooredoo Night Run By Xiaomi</p>
                  <p className={style.description}>Avenue Habib Bourguiba</p>
                  <button className={style.button}>pariticipate</button>
          </div> */}
      {/*           
            <div className={style.item}>
                  <img src={EventImage} alt="img" className={style.img} />
                  <span className={style.date}>SAT, APR 15 AT 8 PM</span>
                  <p className={style.title}>Ooredoo Night Run By Xiaomi</p>
                  <p className={style.description}>Avenue Habib Bourguiba</p>
                  <button className={style.button}>pariticipate</button>
            </div> */}
        

})
    {/* First Ligne */}
   

        {/* Second Ligne */}
        {/* <div className={style.flex}>

            <div className={style.item}>
                  <img src={EventImage} alt="img" className={style.img} />
                  <span className={style.date}>SAT, APR 15 AT 8 PM</span>
                  <p className={style.title}>Ooredoo Night Run By Xiaomi</p>
                  <p className={style.description}>Avenue Habib Bourguiba</p>
                  <button className={style.button}>pariticipate</button>
            </div>
            <div className={style.item}>
                  <img src={EventImage} alt="img" className={style.img} />
                  <span className={style.date}>SAT, APR 15 AT 8 PM</span>
                  <p className={style.title}>Ooredoo Night Run By Xiaomi</p>
                  <p className={style.description}>Avenue Habib Bourguiba</p>
                  <button className={style.button}>pariticipate</button>
          </div>
          
            <div className={style.item}>
                  <img src={EventImage} alt="img" className={style.img} />
                  <span className={style.date}>SAT, APR 15 AT 8 PM</span>
                  <p className={style.title}>Ooredoo Night Run By Xiaomi</p>
                  <p className={style.description}>Avenue Habib Bourguiba</p>
                  <button className={style.button}>pariticipate</button>
            </div>
        
        </div> */}
  
  
const createEventForm = <>
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
                 <input type="file" name="file" placeholder='File' />
              </div>
              <div className={style.formControl}> 
                <label className={style.label}>Event Date :</label>
                 <input type="date" placeholder='Event Title' onChange={(e) => setEventDate(e.target.value)} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:'center'
              }}>
                <button className={style.button} onClick={handleCreateEvent}>Create</button>
              </div>
            </div>
          </form>
  </>  

  return (
    <div className={style.layout}>
      <div className={style.flexCol}>
         <div className={style.flex} style={{
          marginBottom: '20px',
          marginTop:'16px'
         }}>
          <h1>Events</h1>
         
        </div>
         <button onClick={handleToggleForm}>{!toggleForm ? 'Create Event?' : 'Show Available Events'}  </button>
        {!toggleForm && renderEvents}
        {toggleForm && createEventForm}
        
     </div>
    </div>
  )
}

export default Event
