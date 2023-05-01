import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const SinglePost = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState(null);
  const { auth: user } = useAuth();
  const axios = useAxiosPrivate();
    
    useEffect(() => {
      async function fetchPost() {
        try {
           
            const res = await axios.get(`/posts/${id}`);
    setPost(res.data);
        } catch (err) {
          console.log(err);
        }
        
      }
  
      fetchPost();
      
    }, [id]);
    
  
    if (!post) return <div><Link to={'/'}></Link></div>;
  
    return (
    
      <div>
      <h1>{post.user}</h1>
        <p>{post.desc}</p>
        <img src={post.image} alt="" />
      </div>
      
    );
}

export default SinglePost
