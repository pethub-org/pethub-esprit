import { Link, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "../product/market.scss";
import * as React from 'react';
import { spacing } from '@mui/system';

function Order(props) {
 
    const location = useLocation();


  const _id = location.pathname.split("/")[2];
  const axios = useAxiosPrivate();

   const { order } = props;
  //delete
  async function handleDelete(orderid) {
    window.location.reload(false);
    try {
      const response = await axios.delete(`/api/orders/${orderid}`);
    } catch (error) {
      console.error(error);
    }
  }
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

    // <div className="market">
    //   <div className="container">
    //     <div className="content">
    //       <img src={product.image} alt="" />
    //     </div>
    //     <Link to={"/market/" + product._id}>
    //       <p>{product.name}</p>
    //     </Link>
    //     <div className="info" style={{ gap: 120 }}>
    //       <div className="item">
    //         <button onClick={() => handleDelete(product._id)}>
    //           {" "}
    //           <DeleteIcon />
    //         </button>
    //       </div>
    //       <div className="item">
    //         <SaveIcon />
    //       </div>
    //     </div>
    //   </div>
    // </div>


    
    <List sx={{ width: '100%' , maxWidth:700,  bgcolor: 'background.paper' ,  alignItems:"center" , borderRadius: 2 , m:5 }}>
     
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://m.media-amazon.com/images/I/41wwcmSE5nL._SX300_SY300_QL70_FMwebp_.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={order.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               DT {order.price}
              </Typography>
             
            </React.Fragment>
          }
        />
      </ListItem>
     
      <Stack direction="row" spacing={2} sx={{ml:60 }} >
      <Link to={"/market/" + order.productid}>
      <Button variant="contained">View</Button>
 </Link>
      <Button variant="contained" onClick={() => handleDelete(order._id)}>
        Delete 
      </Button>
    </Stack>
    
       
     
   
    </List>





    // <div className="container">
    //   <div className="card">
   
    //     <div className="vitamin">
    //       <h3>{order.name}</h3>
    //     </div>

    //     <h4>price: ${order.price} </h4>
       
    //   </div>
    // </div>

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
export default Order;
