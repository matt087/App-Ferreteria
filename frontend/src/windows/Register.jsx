import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cedula: "",
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:3000/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ci: formData.cedula,
                    name: formData.nombre,
                    lastname: formData.apellido,
                    email: formData.correo,
                    password: formData.password,
                    role: 2,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Swal.fire({ title: '¡Error!', text: data.message || 'No se pudo proceder en el registro', icon: 'error', confirmButtonText: 'Aceptar' });
                throw new Error(data.message || "Error en el registro");
            }

            setSuccess("Usuario registrado con éxito");
            Swal.fire({ title: '¡Éxito!', text: 'Usuario registrado exitosamente', icon: 'success', confirmButtonText: 'Aceptar' });
            setTimeout(() => navigate("/login"), 1000);

        } catch (error) {
            setError(error.message);
            console.log(error.message)
        }
    };

    return (
        <div className="register-container">
            <button className="back-button" onClick={() => navigate("/login")}>
                &#8592; Volver
            </button>
            <div className="register-card">
                <h2 className="register-title">Registro</h2>
                <form onSubmit={handleRegister} className="register-form">
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