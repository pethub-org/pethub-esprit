import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import Axios from "axios";
import "./market.scss";
function FormScreen() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const axios = useAxiosPrivate();

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/categorie");
      setCategorie(data);
    };
    fetchCategories();
  }, []);

  const addNewProduct = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category", selectedCategory);
    formData.append("description", description);
    formData.append("price", price);
    axios.post("/api/products/", formData);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    // <div className="container">
    //   <label htmlFor="">Name: </label>
    //   <input
    //     type="text"
    //     onChange={(e) => {
    //       setName(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <br />
    //   <label htmlFor="">image: </label>
    //   <input
    //     type="file"
    //     onChange={(e) => {
    //       console.log(e.target.files[0]);
    //       setImage(e.target.files[0]);
    //     }}
    //   />

    //   <br />
    //   <br />

    //   <label htmlFor="">description: </label>
    //   <input
    //     type="text"
    //     onChange={(e) => {
    //       setDescription(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <br />
    //   <label htmlFor="">price: </label>
    //   <input
    //     type="number"
    //     onChange={(e) => {
    //       setPrice(e.target.value);
    //     }}
    //   />
    //   <br />
    //   <br />
    //   <label htmlFor="">Categorie: </label>
    //   <select
    //     value={selectedCategory}
    //     onChange={(e) => {
    //       setSelectedCategory(e.target.value);
    //     }}
    //   >
    //     <option value="">All categories</option>
    //     {categorie.map((category) => (
    //       <option key={category._id} value={category.name}>
    //         {category.name}
    //       </option>
    //     ))}
    //   </select>

    //   <br />
    //   <br />
    //   <button onClick={addNewProduct}>Add New Product</button>
    // </div>
    <div className="form-box">
      <h5 className="form-step"> </h5>
      <form>
        <div className="field1">
          <label> add your product </label>
          <input 
            placeholder="Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="price"
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
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
          onClick={addNewProduct}
        >
          submit
        </button>
      </form>
    </div>
  );
}
export default FormScreen;