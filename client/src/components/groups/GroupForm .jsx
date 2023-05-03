import React, { useState } from 'react';
import axios from 'axios';
import './form.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
const GroupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [displayForm, setDisplayForm] = useState(false);

  const { name, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      'http://localhost:8080/api/groups/create',
      formData
    );
    console.log(res.data);
    setFormData({ name: '', description: '' });
  };

  const toggleForm = () => {
    setDisplayForm(!displayForm);
  };
  

  return (
    <div className="group-form">
      <button onClick={toggleForm}><AddOutlinedIcon/> Create a new group</button>
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
            <input type='file' ></input>
          </div>
          <button type="submit">Create Group</button>
        </form>
      )}
    </div>
  );
};

export default GroupForm;
