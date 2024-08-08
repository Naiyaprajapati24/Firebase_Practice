import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {
     const storedEmail = localStorage.getItem("userEmail");
     const navigate = useNavigate();
  return (
     <div className="navbar">
          <div className="email">
            <h2>Email:{storedEmail}</h2>
          </div>
          <div className="ss">
            <h3
              onClick={() => {
                navigate("/SignUp");
              }}
            >
              Sign up
            </h3>
          </div>
          <div className="ss2">
            <h3
              onClick={() => {
                navigate("/SignIn");
              }}
            >
              Sign In
            </h3>
          </div>
          <div className="ss3">
            <h3
              onClick={() => {
                navigate("/ProForm");
              }}
            >
              Add Poducts
            </h3>
          </div>

         
        </div>
  )
}

export default Navbar