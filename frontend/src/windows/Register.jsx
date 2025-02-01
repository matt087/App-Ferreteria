import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
  };

  return (
    <div className="register-container">
      <button className="back-button" onClick={() => navigate("/login")}>
        &#8592; Volver
      </button>
      <div className="register-card">
        <h2 className="register-title">Registro</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="cedula" placeholder="Cédula de Identidad" value={formData.cedula} onChange={handleChange} required className="input-field" />
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="input-field" />
          <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className="input-field" />
          <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} required className="input-field" />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required className="input-field" />
          <button type="submit" className="submit-button">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;