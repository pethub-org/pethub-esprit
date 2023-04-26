import "./market.scss";

import { useEffect, useReducer, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Badge, ResourceList, Stack, TextStyle } from "@shopify/polaris";

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true };
//     case "FETCH_SUCCESS":
//       return { ...state, product: action.payload, loading: false };
//     case "FETCH_FAIL":
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// };
function ProductDetail() {
  const location = useLocation();
  const axios = useAxiosPrivate();

  const _id = location.pathname.split("/")[2];
  const [prod, setProd] = useState({});
  const [review, setreview] = useState([]);
  const [descriprev, setdescriprev] = useState("");
  const addNewProduct = () => {
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
  // const [{ loading, error, product }, dispatch] = useReducer(reducer, {
  //   product: [],
  //   loading: true,
  //   error: "",
  // });
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: "FETCH_REQUEST" });
  //     try {
  //       const result = await axios.get(`/api/products/${id}`);
  //       dispatch({ type: "FETCH_SUCCESS", payload: result.data });
  //     } catch (err) {
  //       dispatch({ type: "FETCH_FAIL", payload: getError(err) });
  //     }
  //   };
  //   fetchData();
  // }, [id]);

  return (
    /* <Row>
        <Col md={4}>
          <img src={prod.image} alt={prod.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{prod.name}</title>
              </Helmet>
              <h1>{prod.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>Price: DT{prod.price}</ListGroup.Item>
            <ListGroup.Item>
              description: <p>{prod.description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              Reviews: <h1>{review.description}</h1>
            </ListGroup.Item>
            {review.map((review) => (
              <ListGroup.Item>
                Reviews: <h1>{review.description}</h1>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>DT{prod.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button variant="primary">add to wishlist</Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row> */
    <div>
      <div className="proddetail">
        <div className="prodimge">
          <img src={prod?.image} height="500" width="500" />
        </div>
        <div className="proddata">
          <h1 className="Productname">{prod.name}</h1>
          <p className="ProdDescription">{prod.description}</p>
          <p className="ProdPrice">£{prod.price}</p>
          <div>
            <button className="Feature">Add to favorite</button>
            <button className="Feature">Add to favorite</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default ProductDetail;
