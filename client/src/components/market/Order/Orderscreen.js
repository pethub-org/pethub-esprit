import React from 'react'
import Order from './order'
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "../product/market.scss";
function Orderscreen() {
  const [orders, setOrder] = useState([]);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/orders/");
      setOrder(data);
    };
    fetchCategories();
  }, []);
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