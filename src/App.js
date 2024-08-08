import logo from "./logo.svg";
import "./App.css";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { app } from "./Fireconfig";
import { Home } from "./Home";
import { ProForm } from "./ProForm";
import { Products } from "./Products";
import { Model } from "./Model";
import UpdateProduct from "./UpdateProduct";
import { AdminProf } from "./AdminProf";
import Navbar from "./Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/ProForm" element={<ProForm />} />
          <Route path="/Model" element={<Model />} />
          <Route path="/AdminProf" element={<AdminProf />} />
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
