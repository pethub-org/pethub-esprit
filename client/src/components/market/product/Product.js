import { Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from '../../../hooks/useAuth';

import "./market.scss";
import { useState } from "react";
function Product(props) {
  const { auth: currentUser } = useAuth()
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState("https://m.media-amazon.com/images/I/41wwcmSE5nL._SX300_SY300_QL70_FMwebp_.jpg");
  const [isImageError, setIsImageError] = useState(false);
  const { product } = props;
  function handleImageError() {
    setIsImageError(true);
  }
  const _id = location.pathname.split("/")[2];
  const axios = useAxiosPrivate();
  const {auth:user} = useAuth()
  const submitorder = (productid) => {

    axios
      .post(`/api/orders/${productid}`, {
        userId: user._id,

        productid: productid,
        name: product.name,
        price: product.price,
        
      })
      .then((response) => {
        alert("order added successfully");


      }).catch(error => {
        alert("Error Ocurred updating employee:"+ error);
      });

  };
  //delete
  async function handleDelete(productid) {
    window.location.reload(false);
    try {
      const response = await axios.delete(`/api/products/${productid}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    

    <div className="container">

      <div className="market-card" >

      
        <div className="image" >
          <Link to={"/market/" + product._id}>
            {product.image ? (   
              <img 
              src={isImageError ? imageSrc : product.image}
              onError={handleImageError}
              alt="Product Image"
           
              
            />
            ) : (
              <img 
          src={imageSrc}
          alt="Default Product Image"
        />
            )}
          </Link>
        </div>
        <div className="vitamin">
          <h3 style={{fontSize:30 , fontWeight:"bold", color:"black" ,marginTop:"10px" , textAlign:"start" }}>{product.name} </h3>
        </div>

        <h4 style={{ color:"gray" }}>Price:  {product.price} Dt </h4>
        <div className="buttons">
          {product.userId === currentUser._id &&
          <button onClick={() => handleDelete(product._id)}>delete</button>}
          {product.userId === currentUser._id &&
          <Link  to={"/updateprod/" + product._id}>
          <button>update</button>
          </Link>}
          <button onClick={() => submitorder(product._id)}>save</button>
        </div>
      </div>
    </div>


  );
}
export default Product;
