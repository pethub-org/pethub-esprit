import React from 'react';
import GroupForm from './GroupForm ';
import GroupList from './GroupList';


const Groups = () => {
  return (
    <div style={{marginTop:"50px"}}>
      <GroupForm />
      <GroupList/>
    </div>
  );
};

export default Groups;
