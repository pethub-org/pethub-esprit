import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosPrivate } from '../../api/axios';

const BASE_URl = 'http://localhost:8080'
const ConfirmAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  
  useEffect(() => { 
    axiosPrivate.get(`/auth/confirm/${token}`).then((res) => {
    setIsLoading(true)

      console.log({ res })
      if (res.status === 200) {
        setIsLoading(false)
        setIsSuccess(true)

        navigate('/login')
      }
    }).catch(err => {
      setIsLoading(false)
        setIsSuccess(false)

    })
  }, [])
  return (
    <div style={{ width: '100vw', height: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {isLoading && <h1>Loading...</h1>}
      {!isSucess && !isLoading && <h1 style={{color:'red'}}>Something went wrong. try again!</h1>}
    </div>
  )
}

export default ConfirmAccount