import React from 'react'
import { useState } from 'react';
import "./SignUp.css"
 import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const SignUp = () => {

    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log("Form submitted:", formData);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, formData.email,formData.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          // ..
        });
    };

   

    



  return (
    <div className='main'>
      <div className="container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
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

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
