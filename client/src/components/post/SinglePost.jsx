import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Post from "./Post";


const SinglePost = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState(null);
  const { auth: user } = useAuth();
  const axios = useAxiosPrivate();
    
    useEffect(() => {
      async function fetchPost() {
        try {
           
          const res = await axios.get(`/api/posts/${id}`);
          setPost(res.data);
        } catch (err) {
          console.log(err);
        }
        
      }
  
      fetchPost();
      
    }, [id]);
    
  
    if (!post) return <div><Link to={'/'}></Link></div>;
  
    return (
    
      <Post post={post}>  
      </Post>
      
    );
}

export default SinglePost
