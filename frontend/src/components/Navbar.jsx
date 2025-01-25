import React from "react";
import { Link } from "react-router-dom";

function Navbar()
{
    return (
        <nav className="navbar">
          <Link to="/" className="navbarButton">Home</Link>
          <Link to="/about" className="navbarButton">Acerca de Nosotros</Link>
          <Link to="/login" className="navbarButton">Iniciar Sesión</Link>
        </nav>
      );
}

export default Navbar