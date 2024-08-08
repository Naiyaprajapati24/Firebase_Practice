import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from './Fireconfig';
import "./AdminProf.css"

export const AdminProf = () => {
const navigate = useNavigate();
const [newProduct, setNewProduct] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product for editing

// Function to delete a product by id
async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, "productData", id));
    console.log(`Product with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}: `, error);
  }
}

// Set up real-time listener for the Firestore collection
useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "productData"),
    (snapshot) => {
      const allData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewProduct(allData);
    },
    (error) => {
      console.error("Error fetching products: ", error);
    }
  );

  // Clean up listener on component unmount
  return () => unsubscribe();
}, []);

// Handle edit button click
const handleEdit = (product) => {
  setSelectedProduct(product);
};
const handleUpdateClick = (keyid) => {
  navigate(`/UpdateProduct/${keyid}`);
};

useEffect(()=>{
    const email = localStorage.getItem("userEmail");
    if(email!=="admin@gmail.com")
    {
        navigate("/");
    }
})



  return (
    <div>
        <div className='navbaradmin'>

        </div>
      <div className="product-hold">
        {newProduct.map((res) => {
          return (
            <div className="product-card">
              <p>id : {res.id}</p>
              <p>Name : {res.productName}</p>
              <img
                src={res.productImage}
                style={{ maxWidth: "150px", maxHeight: "300px" }}
              />
              <p>Id : {res.productId}</p>
              <p>price : {res.productPrice}</p>
              <p>Description : {res.productDesc}</p>

              <button
                className="delete"
                onClick={() => {
                  deleteProduct(res.id);
                }}
              >
                Delete
              </button>
              <button
                className="edit"
                onClick={() => handleUpdateClick(res.id)}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
