import "./market.scss";

import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { blue } from "@mui/material/colors";
import useAuth from "../../../hooks/useAuth";


function ProductDetail() {
  const { auth: currentUser } = useAuth()
  const {auth:user} = useAuth()

  const location = useLocation();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpennnn, setIsOpennnn] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  function handleImageError() {
    setIsImageError(true);
  }
  const togglePopupdate = () => {
    setIsOpennnn(!isOpennnn);
  }
  const [imageSrc, setImageSrc] = useState("https://m.media-amazon.com/images/I/41wwcmSE5nL._SX300_SY300_QL70_FMwebp_.jpg");
  const [isImageError, setIsImageError] = useState(false);
  const _id = location.pathname.split("/")[2];
  const [prod, setProd] = useState({});
  const [review, setreview] = useState([]);
  const [descriprev, setdescriprev] = useState("");
  const [userr, setUser] = useState({})

  const addNewProduct = () => {
    window.location.reload(false);

    axios.post("/api/reviews/" + _id, {
      userId: user._id,
      description: descriprev,

    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${review.userId}`);
      setUser(res.data)
    
    };
    fetchUser();

  }, [])



  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await axios.get("/api/products/" + _id);
        setProd(result.data);
      } catch {}
    };
    getProduct();
  }, [_id]);

  useEffect(() => {
    const getReview = async () => {
      try {
        const result = await axios.get("/api/reviews/" + _id);
        setreview(result.data);
      } catch {}
    };
    getReview();
  }, [_id]);
 
  async function handleDelete(reviewid) {
    window.location.reload(false);
    try {
      const response = await axios.delete(`/api/reviews/${reviewid}`);
    } catch (error) {
      console.error(error);
    }
  }
  async function submitActionHandler(reviewid, event) {

    axios
      .put("/api/reviews/update/" + reviewid, {
 
        description: descriprev,
      })
      .then((response) => {
       

      }).catch(error => {
        alert("Error Ocurred updating employee:"+ error);
      });

  };
  return (
   
    <div>
      <div className="proddetail">
        <div className="prodimge">
        {prod.image ? (   
              <img 
              src={isImageError ? imageSrc : prod.image}
              onError={handleImageError}
              alt="Product Image"
            />
            ) : (
              <img 
          src={imageSrc}
          alt="Default Product Image"
        />
            )}
        </div>
        <div className="proddata">
          <h1 className="Productname">{prod.name}</h1>
                  <h2 style={{marginLeft:30 , color:"white" ,fontWeight:20}}> uploaded by {currentUser.firstname}</h2>
      
         
          <hr style={{marginLeft:20 , width:300 , marginRight:20}}></hr>
          <p className="ProdPrice"> {prod.price} DT</p>
        
          <hr style={{marginLeft:20 , width:300 , marginRight:20}}></hr>
          <h4 style={{marginTop:2 , marginLeft:30 , color: "white"}}>Description:</h4>
          <p className="ProdDescription"> {prod.description}</p>
          <hr style={{marginLeft:20 , width:300 , marginRight:20}}></hr>

          <div>
            <button className="Feature">save </button>
            
            <button className="Feature"  onClick={togglePopup}>Submit Review</button>
         
    {isOpen && 
     <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={togglePopup}>x</span>
        <h5 >Submit Review</h5>
        <textarea
         type="text"
         
         onChange={(e) => {
          setdescriprev(e.target.value);
        }}
        />
      
        <button className="buttonpopup" onClick={  addNewProduct}>submit</button>
      </div>
    </div>}
  
    
          </div>
        </div>
      </div>
      <div>
      <h3 style={{color:"white" , alignItems:"flex-start", display: 'flex'  , marginLeft:30}}> Reviews:</h3>
      {review?.length > 0 ? (
      review.map((review) => <h1>
      <div  style={{padding: 10}}>
<div style={{width:500}}>
      
<hr style={{marginLeft:20 , width:750 , marginRight:20}}></hr>
           <div  style={{marginTop:3 , marginBottom:3}}>
               <div class="rating-outer">
                   <div class="rating-inner"></div>
               </div>
                 <p className="review_user">by {user.firstname}</p>

               
              
               <p style={{marginLeft:20 , color:"white"}}>{review.description}</p>
         

                < div style={{display:"flex" , marginRight:10 }}>
                {review.userId === currentUser._id &&  

                <button  style={{ marginRight:12,marginLeft:600 , backgroundColor: "blue" }} onClick={togglePopupdate} >update</button>
                }
                {isOpennnn && 
                  <div className="popup-box">
                       <div className="box">
                           <span className="close-icon" onClick={togglePopupdate}>x</span>
                             <h5 >update your Review</h5>
                                <textarea
                                 type="text"
                           onChange={(e) => {
                          setdescriprev(e.target.value);
                              }}
                                />
 
                 <button className="buttonpopup" onClick={submitActionHandler(review._id)}>submit</button>
                   </div>
                </div>}
                {review.userId === currentUser._id &&  

               <button style={{   backgroundColor: "blue" }} onClick={() => handleDelete(review._id)}>delete</button>
                }
               </div>  
                    






               <hr style={{marginLeft:20 , width:750 , marginRight:20}}></hr>
           </div>
   </div>
</div>
     </h1>)
    ) : (
      <p style={{fontSize:"25px" , textAlign:"center" , color:"white"}}>No reviews for {prod.name}</p>
    )}
 
   
          
     
      </div>

      
    </div>
  );
}
export default ProductDetail;