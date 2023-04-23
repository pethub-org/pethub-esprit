import React from 'react'
import { useParams } from 'react-router-dom';
import EditContent from './EditContent';
import Sidebar from './Sidebar';

const EditProfile = () => {
  let { id } = useParams();
  
  return (
    <div>
      <Sidebar />
      <EditContent/>

    </div>
  )
}

export default EditProfile