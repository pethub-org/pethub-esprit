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

import "./market.scss";
import { useState } from "react";
function Product(props) {
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState("https://i.imgur.com/VcypK5c.png");
  const [isImageError, setIsImageError] = useState(false);
  const { product } = props;
  function handleImageError() {
    setIsImageError(true);
  }
  const _id = location.pathname.split("/")[2];
  const axios = useAxiosPrivate();

  const submitorder = (productid) => {

    axios
      .post(`/api/orders/${productid}`, {
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
      <div className="card">
        <div className="image">
          <Link to={"/market/" + product._id}>
            {isImageError ? (   
              <img src={`/uploads/${product.image}`} alt="Default Image" />
            ) : (
              <img src={product.image} onError={handleImageError} alt="Image" />
            )}
          </Link>
        </div>
        <div className="vitamin">
          <h3 style={{fontSize:30 , fontWeight:"bold"}}>{product.name} </h3>
        </div>

        <h4>price: ${product.price} </h4>
        <div className="buttons">
          <button onClick={() => handleDelete(product._id)}>delete</button>
          <Link  to={"/updateprod/" + product._id}>
          <button>update</button>
          </Link>
          <button onClick={() => submitorder(product._id)}>add to wishlist</button>
        </div>
      </div>
    </div>

    ///////////////////////////////////////////////////////
    // <div className="card">
    //   <div className="wrapper">
    //     <div className={CardName}></div>
    //     <Link to={"/product/" + product._id}>
    //       <img src={product.image} className="card_img" alt={product.name} />
    //     </Link>
    //     <div className="heart">
    //       {" "}
    //       <svg xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 64 64">
    //         <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z"></path>
    //       </svg>{" "}
    //     </div>
    //     <div className="cardInfo">
    //       <h1>{product.name}</h1>

    //       <div className="action">
    //         <div className="priceGroup">
    //           <p className="price newPrice">{product.price}</p>
    //         </div>
    //         <div className="cart">
    //           <svg
    //             className="outCart"
    //             xmlns="<http://www.w3.org/2000/svg>"
    //             viewBox="0 0 64 64"
    //           >
    //             <path d="M2 6h10l10 40h32l8-24H16"></path>
    //             <circle cx="23" cy="54" r="4"></circle>
    //             <circle cx="49" cy="54" r="4"></circle>
    //           </svg>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
export default Product;
