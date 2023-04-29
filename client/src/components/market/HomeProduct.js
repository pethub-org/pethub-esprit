import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import "./market.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const HomeProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/categorie/");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products/";
        if (selectedCategory) {
          url = `/api/products/bycategory/${selectedCategory}`;
        }
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="catsearchcenter">
        <select
          className="categoriehome"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <form>
          <input
            className="search"
            placeholder="Search Products"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="marktes">
        {products
          .filter((product) => {
            return search.toLowerCase() === ""
              ? product
              : product.name.toLowerCase().includes(search);
          })
          .map((product) => (
            <Product product={product} className="posts"></Product>
          ))}
      </div>
    </div>
  );
};

export default HomeProduct;