import React from 'react'
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './SignIn.css'

//import { app } from './Fireconfig';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './Fireconfig';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {

 const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log("Form submitted:", formData);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async(userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(userCredential)
          localStorage.setItem("userEmail",formData.email);
          if (formData.email == "admin@gmail.com") {
            navigate("/AdminProf");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });

         const docRef = await addDoc(collection(db, "UserData"), {
          Email:formData.email,
          Name:formData.username,
          Password :formData.password,
          
        }).then( (response)=>{
          console.log(response);
        }

        ).catch( (error)=>{
          console.log("123"+error);
        }
        )
       console.log("Document written with ID: ", docRef?.id);





    };
  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter your username"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
