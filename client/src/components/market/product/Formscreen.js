import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import Axios from "axios";
import "./market.scss";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

function FormScreen() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { auth: user } = useAuth()
  const [categorie, setCategorie] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const [price, setPrice] = useState(0);

  const handleSelectFile = (e) => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/api/categorie");
      setCategorie(data);
    };
    fetchCategories();
  }, []);


  const addNewProduct = () => {
    axios.post('/api/products/', { name, description, selectedCategory, price, image, userId: user._id }, { headers: { "Content-Type": 'multipart/form-data' } }).then(response => {
      console.log(response)
    })
    navigate('/market')
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
      <form encType="multiple/form-data" onSubmit={addNewProduct}>
        <div className="field1">
          <label style={{ color: "white" }}> add your product </label>
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
          {/* <input
            style={{
              alignItems: "center",
            }}
            placeholder="image"
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setImage(e.target.files[0]);
            }}
          /> */}
          <textarea
            placeholder="Description"
            type="number"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input name="image" type="file" placeholder="product image" onChange={handleSelectFile} style={{ color: 'white' }} />
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
        >
          submit
        </button>
      </form>
    </div>
  );
}
export default FormScreen;
