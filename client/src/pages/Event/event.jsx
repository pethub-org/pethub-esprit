import React, { useContext, useEffect, useId, useState } from 'react'
import style from "./event.module.css"
import EventImage from '../../assets/event_img.jpg'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { axiosPrivate } from '../../api/axios';
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';


const Event = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  const id = useId()

  const handleSelectFile = (e) => {
    setImage(e.target.files[0])
  }

  const navigate = useNavigate();

  // TODO: fix me 
  // const [buttonText, setButtonText] = useState('');
  // const [clickHandler,setClickHanlder] = useState();
  
  const { auth} = useAuth();

  const handleToggleForm = () => setToggleForm(prev => !prev);

  const handleEditEvent = async(event) => {
      navigate('/events/'+event._id)
  }
  const handleDeleteEvent = async (event) => {
    setIsLoading(true)
    axiosPrivate.delete('/events/' + event._id).then(res => {
      console.log({ res })
      setIsLoading(false)
    }).catch(err => setIsLoading(false))
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
    const response = await axiosPrivate.put(`/events/participate/${event._id}`, {})
    console.log({response})
  }

  const handleUnparticipate = async (event) => {
    const response = await axiosPrivate.put(`/events/unparticipate/${event._id}`, {})
    console.log({response})
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true)
       try {
    if (!title.trim()) {
      // setError('title can not')*
        toast.error('Title can not be empty!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
      
      return;
    }

     if (!description.trim()) {
      // setError('title can not')*
        toast.error('Description can not be empty!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
      
      return;
    }

    if (!eventDate.trim()) {
        toast.error('Date can not be empty!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
      
      return;
    }
      if (new Date(eventDate) < Date.now()) {
      // setError('title can not')*
        toast.error('Date can not be in the past!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
      
      return;
    }

    if (!image) {
      // setError('title can not')*
        toast.error('Image is required!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
      
      return;
    }
 
      const res = await axiosPrivate.post('/events', { title, description, eventDate ,image},{ headers: { "Content-Type": 'multipart/form-data' } });
    setEvents(prevEvents => [...prevEvents,res.data.event])
      setTitle('')
      setDescription('')
      setEventDate('')
       toast.success('Event added sucessfully!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
      
      return;

    } catch (error) {
        toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        });
      setIsLoading(false)
      return;
       } finally {
         
      setIsLoading(false)
    }


    
  }
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController();
    
    
    const fetchEvents = async () => {
      const response = await axiosPrivate.get('/events', {signal: controller.signal})
      setEvents(response.data.events)
    }
    fetchEvents()

      return () => {
            isMounted = false;
            controller.abort();
        }
  }, [toggleForm])
    
  const renderEvents = events?.map((event, i) => {
    const formatedDate = new Intl.DateTimeFormat(undefined, { dateStyle: "long" }).format(new Date(event.eventDate));
    const isParticipated = event.participants.find((id) => id === auth._id)

    // const button = !isParticipated ?
    //       <button className={style.button} key={event._id} onClick={() => handleParticipate(event)}>Pariticipate</button>
    //   : <button className={style.button} key={event._id} onClick={() => handleUnparticipate(event)}>Leave</button>

    const isMyEvent = event.creatorId === auth._id 


    // const actionButtons = isMyEvent ?
    //   <>
    //    <button className={style.button} key={event._id} onClick={() => handleEditEvent(event)}> Edit</button>
    //    <button className={style.button} key={id} onClick={() => handleDeleteEvent(event)}> Delete</button>
    //   </>
    //   : null;
    

    return (
    <div className={style.flex} key={i}>

      <div className={style.item}>
        <img src={event?.image ? event?.image : EventImage} alt="img" className={style.img} />
        <span className={style.date}>{formatedDate}</span>
        <p className={style.title}>{event.title}</p>
          <p className={style.description}>{event.description}</p>
          {/* {isMyEvent ? actionButtons : button} */}
          <Button isMyEvent={isMyEvent} event={event} isParticipated={isParticipated} setEvents={setEvents}/>
        
      </div>

     </div>
      )
    

        

})
    {/* First Ligne */}

  
  
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
                 <input type="file" name="image" placeholder='File' onChange={handleSelectFile}/>
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
                <button className={style.shareButton}  disabled={isLoading} onClick={handleCreateEvent}>Create</button>
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
         <button onClick={handleToggleForm}  className={style.shareButton}>{!toggleForm ? 'Create Event?' : 'Show Available Events'}  </button>
        {!toggleForm && renderEvents}
        {toggleForm && createEventForm}
        <ToastContainer/>
     </div>
    </div>
  )
}

export default Event
