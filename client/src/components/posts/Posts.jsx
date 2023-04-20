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
    // const [Posts,setPosts]= useState([]);
    // const {user} = useContext(AuthContext)
  const { auth: user } = useAuth()
  const axios = useAxiosPrivate();

    // useEffect(()=>{
    //   const fetchPosts = async ()=>{
    //     const res = username ?  await  axios.get("/api/posts/profile/"+username)
    //                          :  await  axios.get("/apposts/timeline/all/" + user._id );
    //     //ordre des posts
    //     setPosts(res.data.sort((p1,p2)=>{
    //       return new Date(p2.createdAt) - new Date (p1.createdAt);
    //     }))
    //   };
    //   fetchPosts();
    // },[username,user._id])
    
    

    
  return (
    <div>
    {posts.length > 0 ? (
      posts.map((post) => <Post key={post._id} post={post} setPosts={setPosts} />)
    ) : (
      <p style={{fontSize:"25px" , textAlign:"center"}}>No posts to display.</p>
    )}
  </div>
);
    }

 
export default Posts