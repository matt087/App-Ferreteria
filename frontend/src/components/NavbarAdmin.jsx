import React from "react";
import { Link } from "react-router-dom";

function Navbar()
{
    return (
        <nav className="navbar">
          <Link to="/home-admin" className="navbarButton">Home</Link>
          <Link to="/inventario" className="navbarButton">Inventario</Link>
          <Link to="/pedidos" className="navbarButton">Pedidos</Link>
        </nav>
      );
}

export default Navbar