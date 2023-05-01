import "./market.scss";

import { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { blue } from "@mui/material/colors";


function ProductDetail() {
  const location = useLocation();
  const axios = useAxiosPrivate();

    const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  const _id = location.pathname.split("/")[2];
  const [prod, setProd] = useState({});
  const [review, setreview] = useState([]);
  const [descriprev, setdescriprev] = useState("");
  const addNewProduct = () => {
    window.location.reload(false);

    axios.post("/api/reviews/" + _id, {
      description: descriprev,
    });
  };

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
  return (
   
    <div>
      <div className="proddetail">
        <div className="prodimge">
          <img src={prod.image} height="500" width="500" />
        </div>
        <div className="proddata">
          <h1 className="Productname">{prod.name}</h1>
          <hr style={{marginLeft:20 , width:300 , marginRight:20}}></hr>
          <p className="ProdPrice"> {prod.price} DT</p>
        
          <hr style={{marginLeft:20 , width:300 , marginRight:20}}></hr>
          <h4 style={{marginTop:2 , marginLeft:30}}>Description:</h4>
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
        <button className="buttonpopup" onClick={addNewProduct}>submit</button>
      </div>
    </div>}
  
    
          </div>
        </div>
      </div>
      <div>
      <h3 style={{color:"white" , alignItems:"flex-start", display: 'flex'  , marginLeft:30}}> Reviews:</h3>
      {review.map((review) => (
          <h1>
           <div  style={{padding: 10}}>
		<div style={{width:500}}>
           
    <hr style={{marginLeft:20 , width:700 , marginRight:20}}></hr>
                <div  style={{marginTop:3 , marginBottom:3}}>
                    <div class="rating-outer">
                        <div class="rating-inner"></div>
                    </div>
                    <p className="review_user">by John</p>
                    <p style={{marginLeft:20 , color:"white"}}>{review.description}</p>
                    <button style={{ marginLeft:650 , backgroundColor: "blue" }} onClick={() => handleDelete(review._id)}>delete</button>
                    <hr style={{marginLeft:20 , width:700 , marginRight:20}}></hr>
                </div>
        </div>
    </div>
          </h1>
          ))}
      </div>

      
    </div>
  );
}
export default ProductDetail;