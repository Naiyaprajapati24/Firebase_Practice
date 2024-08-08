import React, { useState } from "react";
import "./ProForm.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./Fireconfig";
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export const ProForm = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    productDescription: "",
    productPrice: "",
    productImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, file.name);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImage(url);

        // Now, add document to Firestore with image URL
        await addDoc(collection(db, "productData"), {
          productName: formData.productName,
          productId: formData.productId,
          productDesc: formData.productDescription,
          productPrice: formData.productPrice,
          productImage:url,
        });

        console.log("Document successfully written with ID: ", ref.id);
      } catch (error) {
        console.error("Error uploading file or adding document: ", error);
      }
    } else {
      console.error("No file selected for upload.");
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>Product Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productId">Product ID:</label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Product Price:</label>
            <textarea
              id="productPrice"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Product Description:</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <p className="para">Enter an image</p>
          <div className="upload">
            <input type="file" onChange={handleFileChange} />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProForm;
