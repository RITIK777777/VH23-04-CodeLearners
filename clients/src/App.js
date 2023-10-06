import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Register from "./Layout/Register";

// import Home from "./components/Home";
// import Scholarship from "./components/Scholarship";
// import Details from "./components/Details";
// import Contact from "./components/Contact";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import UserLogin from "./components/UserLogin";
// import AdminLogin from "./components/AdminLogin";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" exact element={Home} />
        <Route path="/scholarship" element={Scholarship} />
        <Route path="/details" element={Details} />
        <Route path="/contact" element={Contact} />
        <Route path="/login" element={Login} />
        <Route path="/signup" element={Signup} />
        <Route path="/user-login" element={UserLogin} /> */}
        <Route path="/admin-login" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
