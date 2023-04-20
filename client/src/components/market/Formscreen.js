import { useEffect, useState } from "react";
import Axios from "axios";

function FormScreen() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await Axios.get("/categorie");
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
    Axios.post("http://localhost:3000/api/products/", formData);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <div className="container">
      <label htmlFor="">Name: </label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <br />
      <label htmlFor="">image: </label>
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setImage(e.target.files[0]);
        }}
      />

      <br />
      <br />

      <label htmlFor="">description: </label>
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <br />
      <label htmlFor="">price: </label>
      <input
        type="number"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <br />
      <br />
      <label htmlFor="">Categorie: </label>
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
      >
        <option value="">All categories</option>
        {categorie.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <br />
      <br />
      <button onClick={addNewProduct}>Add New Product</button>
    </div>
  );
}
export default FormScreen;
