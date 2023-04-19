import './Posts.scss'
import Post from '../Post/Post'

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Comments from '../comments/Comments';
const Posts = ({username}) => {
    const [Posts,setPosts]= useState([]);
    const {user} = useContext(AuthContext)
    useEffect(()=>{
      const fetchPosts = async ()=>{
        const res = username ?  await  axios.get("/posts/profile/"+username)
                             :  await  axios.get("/posts/timeline/all/" + user._id );
        //ordre des posts
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date (p1.createdAt);
        }))
      };
      fetchPosts();
    },[username,user._id])
    
    

    
  return (
    <div>
    {Posts.length > 0 ? (
      Posts.map((post) => <Post key={post._id} post={post} />)
    ) : (
      <p style={{fontSize:"25px" , textAlign:"center"}}>No posts to display.</p>
    )}
  </div>
);
    }

 
export default Posts