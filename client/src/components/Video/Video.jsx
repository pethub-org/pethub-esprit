
import React, { useEffect, useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import './Video.scss'

const Video = ({setOpen}) => {
    const [video,setVideo]= useState(undefined)
    const [videoPercent,setVideoPercent]= useState(0)
 
  return (
    <div className="video">
    <div className="container" >
    <button className='btn' >Upload</button>
        <div className="wrapper" >
             <CancelOutlinedIcon onClick={()=>setOpen(false)} className='cancel'/>
             <input type="file" accept="video/*" className='file' onChange={(e)=>setVideo(e.target.files[0])}/>
             
             
        </div>
    </div>
    </div>

  )
}

export default Video