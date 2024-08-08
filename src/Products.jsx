import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { docs } from "firebase/firestore";
import { db, storage } from './Fireconfig';
import "./Products.css"
import { ProForm } from "./ProForm";
import { useNavigate } from 'react-router-dom';

export const Products = () => {
const navigate = useNavigate();
 
/*useEffect(()=>{
  const docRef = collection(db, "productData");
  const docSnap = getDocs(docRef)
     .then((response) => {
       const data = response.docs.map((e)=>{
        return e.data();
       });
       console.log(data);
       setnewProduct(data);
       //console.log(response);
     })
     .catch((error) => {
       console.log(error);
     });
},[])*/

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
const handleUpdateClick=(keyid)=>{
  navigate(`/UpdateProduct/${keyid}`)
}

  return (
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
          </div>
        );
      })}
     
    </div>
  );
}
