import { Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
function Product(props) {
  const location = useLocation();

  const _id = location.pathname.split("/")[2];
  const { product } = props;
  return (
    // <Card key={_id}>
    //   <Link to={"/product/" + product._id}>
    //     <img src={product.image} className="card-img-top" alt={product.name} />
    //   </Link>
    //   <Card.Body>
    //     <Link to={"/product/" + product._id}>
    //       <Card.Title>{product.name}</Card.Title>
    //     </Link>
    //     <Card.Text>DT{product.price}</Card.Text>
    //   </Card.Body>

    //   <Button>add to wishlist</Button>
    // </Card>

    // <Card style={{ width: "18rem" }} key={_id}>
    //   <Link to={"/market/" + product._id}>
    //     <img src={product.image} className="card-img-top" alt={product.name} />
    //   </Link>

    //   <Card.Body>
    //     <Card.Title>{product.name}</Card.Title>
    //     <Card.Title>DT{product.price}</Card.Title>

    //     <Button variant="primary">add to wishlist</Button>
    //   </Card.Body>
    // </Card>
    <Link to={"/market/" + product._id}>
      <div className="market">
        <div className="container">
          <div className="content">
            <img src={product.image} alt="" />
          </div>
          <p>{product.name}</p>
          <div className="info">
            <div className="item">
              <ReplyAllOutlinedIcon />
              Share
            </div>
          </div>
        </div>
      </div>
    </Link>

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
