import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const loginUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message);
    }

    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

const Login = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErrorMessage(""); 

    try {
      const userData = await loginUser(email, password);
      console.log("Inicio de sesión exitoso:", userData);

      Swal.fire({
        title: '¡Éxito!',
        text: 'Inicio de sesión exitoso',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      localStorage.setItem('userData', JSON.stringify(userData.user));
      if (userData.user.role == 1) {
        navigate("/home-admin");  
      } else {
        navigate("/home-user");  
      }
    
    } catch (error) {
      Swal.fire({
        title: '¡Error!',
        text: 'No se pudo iniciar sesión',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      setErrorMessage(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="show-password-button"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
