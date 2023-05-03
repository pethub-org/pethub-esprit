import React from 'react'
import Order from './order'
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../product/market.scss";
import useAuth from '../../../hooks/useAuth';
function Orderscreen() {
  const [orders, setOrder] = useState([]);
  const {auth:user} = useAuth()
  const axios = useAxiosPrivate();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await axios.get("/api/orders/" + user._id);
        setOrder(result.data);
      } catch {}
    };
    getProduct();
  }, [user._id]);
  
  return (
     <div  >
   <h1 style={{color:"white"}}> All item saved</h1>
{orders.map((order) => (
 <Order order={order}  className="order"></Order>
))}
      
     </div>
  )
}

export default Orderscreen