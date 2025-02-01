import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./windows/Home";
import About from "./windows/About";
import Login from "./windows/Login";
import HomeAdmin from "./windows/HomeAdmin";
import ProtectedAdminRoute from "./ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedAdminRoute/>}>
          <Route path="/home-admin" element={<HomeAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
