import React, { useState } from 'react';
import axios from 'axios';
import './form.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const GroupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [image, setImage] = useState(null);

  const [displayForm, setDisplayForm] = useState(false);
  const axios = useAxiosPrivate();

  const { name, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/groups/create', {...formData,image}, { headers: { 'Content-Type': 'multipart/form-data' } });
    // console.log(res.data);
    setFormData({ name: '', description: '' });
  };

  const toggleForm = () => {
    setDisplayForm(!displayForm);
  };
  const handleSelectFile = (e) => {
    setImage(e.target.files[0])
  }
  

  return (
    <div className="group-form">
      <button onClick={toggleForm} style={{backgroundColor:"transparent",border:"none"}}><AddOutlinedIcon/> Create a new group</button>
      {displayForm && (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Name Group"
              style={{
                padding: '15px',
                borderRadius: '15px',
                marginTop: '6px',
                marginLeft: '6px',
                opacity: '0.9',
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              placeholder="Desciption Group"
              value={description}
              onChange={onChange}
              style={{
                padding: '15px',
                borderRadius: '15px',
                marginTop: '6px',
                marginLeft: '6px',
                opacity: '0.9',
              }}
            ></input>
            <label htmlFor="image"> Image </label>
            <input type='file' name="image" onChange={handleSelectFile} ></input>
          </div>
          <button type="submit">Create Group</button>
        </form>
      )}
    </div>
  );
};

export default GroupForm;
