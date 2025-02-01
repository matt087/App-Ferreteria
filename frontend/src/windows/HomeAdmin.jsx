import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
const HomeAdmin = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser && storedUser.role === 1) {
      setAdminName(storedUser.name || "Vendedor");
    } else {
      navigate("/home-admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <>
        <HeaderAdmin></HeaderAdmin>
        <div className="welcome-container">
          <div className="welcome-card">
            <h1 className="welcome-title">¡Bienvenido, {adminName}! 🎉</h1>
            <p className="welcome-text">Has iniciado sesión como vendedor.</p>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </div>
        </div>
        <Footer></Footer>
    </>
   
  );
};

export default HomeAdmin;
