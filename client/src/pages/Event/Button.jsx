import React, { useEffect, useState } from 'react'
import style from './event.module.css';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Button = ({event,isMyEvent,isParticipated,setEvents}) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const {auth} = useAuth();
    const handleParticipate = async (event) => {
        const response = await axiosPrivate.put(`/events/participate/${event._id}`, {})
        setEvents(prevEvents => {
            const eventIndex = prevEvents?.findIndex(e => e?._id === event?._id);
            const newEvents = [];
            for (let i = 0; i < prevEvents.length; i++) { 
                if (i === eventIndex) {
                    let e = prevEvents[eventIndex];
                    newEvents.push({...e,participants:[...e.participants,auth._id]})
                }
                else {
                    newEvents.push(prevEvents[i])
                }
            }
            setEvents(newEvents);
        })
        // console.log({response})
    }

    const handleUnparticipate = async (event) => {
        const response = await axiosPrivate.put(`/events/unparticipate/${event._id}`, {})
        // console.log({ response })
            setEvents(prevEvents => {
            const eventIndex = prevEvents?.findIndex(e => e?._id === event?._id);
            const newEvents = [];
            for (let i = 0; i < prevEvents.length; i++) { 
                if (i === eventIndex) {
                    let e = prevEvents[eventIndex];
                    let p = e.participants.filter(p => p !== auth._id)
                    newEvents.push({...e,participants:p})
                }
                else {
                    newEvents.push(prevEvents[i])
                }
            }
            setEvents(newEvents);
        })
    }

    const handleEditEvent = async(event) => {
      navigate('/events/'+event._id)
    }
    const handleDeleteEvent = async(event) => {
        axiosPrivate.delete('/events/' + event._id).then(res => console.log({ res }))
        setEvents(prevEvents => {
            return prevEvents.filter(e => e._id !== event._id);
        })
    }
    if (isMyEvent) {
        return (
            <>
                <button className={style.button} key={event._id} onClick={() => handleEditEvent(event)}> Edit</button>
                <button className={style.button} key={"id"} onClick={() => handleDeleteEvent(event)}> Delete</button>
            </>
        )
    }

    if (!isParticipated) {
        return (
          <button className={style.button} key={event._id} onClick={() => handleParticipate(event)}>Pariticipate</button>
        )
    }
    if (isParticipated) {
        return (
          <button className={style.button} key={event._id} onClick={() => handleUnparticipate(event)}>Leave</button>
        )
    }
    return <>
    </>
}

export default Button