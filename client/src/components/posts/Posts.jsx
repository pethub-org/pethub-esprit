import './posts.scss'
import post from '../post/Post'

import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../context/AuthContext';
import Comments from '../comments/Comments';
import useAuth from '../../hooks/useAuth';
import Post from '../post/Post';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Posts = ({username,setPosts,posts}) => {

  const { auth: user } = useAuth()
  const axios = useAxiosPrivate();
    

    
  return (
    <div>
    {posts?.length > 0 ? (
      posts.map((post) => <Post key={post._id} post={post} setPosts={setPosts} />)
    ) : (
      <p style={{fontSize:"25px" , textAlign:"center"}}>No posts to display.</p>
    )}
  </div>
);
    }

 
export default Posts