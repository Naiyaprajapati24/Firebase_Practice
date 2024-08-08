// UpdateProduct.js
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "./Fireconfig";

function UpdateProduct(){
  const [product, setProduct] = useState({
    productName: "",
    productImage: "",
    productId: "",
    productPrice: "",
    productDesc: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productData", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "productData", id);
      await updateDoc(docRef, product);
      navigate("/");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="productImage"
            value={product.productImage}
            onChange={handleChange}
          />
        </label>
        <label>
          ID:
          <input
            type="text"
            name="productId"
            value={product.productId}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="productDesc"
            value={product.productDesc}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};
 export default UpdateProduct;