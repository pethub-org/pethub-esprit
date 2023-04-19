import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosPrivate } from '../../api/axios';

const BASE_URl = 'http://localhost:8080'
const ConfirmAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => { 
     axiosPrivate.get(`/auth/confirm/${token}`).then((res) => {
      console.log({ res })
      if (res.status === 200) {
        navigate('/login')
      }
    })
  }, [])
  return (
    <>Loading...</>
  )
}

export default ConfirmAccount