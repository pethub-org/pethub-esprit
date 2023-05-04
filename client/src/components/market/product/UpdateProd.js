import { useEffect, useState } from "react";
// import Axios from "axios";
import {useNavigate , useLocation} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import "./market.scss";
function UpdateProd() {

    const location = useLocation();

    const _id = location.pathname.split("/")[2];
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [price, setPrice] = useState(0);
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/categorie");
      setCategorie(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await axios.get("/api/products/" + _id);
        const empData = result.data;
        setDescription(empData.description);
        setName(empData.name);
        setPrice(empData.price);
        setSelectedCategory(empData.categorie)
        
      } catch {}
    };
    getProduct();
  }, [_id]);

  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .put("/api/products/update/" + _id, {
        name: name,
        description: description,
        price: price
      })
      .then((response) => {
        alert("prod "+ name +" updated!");
        navigate('/market')

      }).catch(error => {
        alert("Error Ocurred updating employee:"+ error);
      });

  };

  return (

    <div className="form-box">
      <h5 className="form-step"> </h5>
      <form>
        <div className="field1">
          <label style={{color:"white"}}> update your product </label>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="input-field"
            placeholder="price"
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            style={{
              alignItems: "center",
            }}
            placeholder="image"
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setImage(e.target.files[0]);
            }}
          />
          <textarea
            placeholder="Description"
            type="number"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <select
            className="categorie"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="">select categorie</option>
            {categorie.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          id="submitBtn"
          className="submitButton"
          onClick={submitActionHandler}
        >
          submit
        </button>
      </form>
    </div>
  );
}
export default UpdateProd;
