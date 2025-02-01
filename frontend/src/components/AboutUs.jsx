import React from "react";
import negocio from "../assets/negocio.jpg"
const AboutUs = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">Acerca de Ferretería Trujillo</h2>

      <div className="about-content">
        {}
        <img
          src={negocio}
          alt="Ferretería Trujillo"
          className="about-image"
        />

        {}
        <div className="about-text">
          <p>
            En <strong>Ferretería Trujillo</strong>, ofrecemos productos de calidad para construcción, electricidad, plomería y más. Nos destacamos por nuestro amplio catálogo, precios accesibles y atención personalizada.
          </p>

          <h3>Nuestra Misión</h3>
          <p>
            Brindar soluciones en herramientas y materiales de construcción con el mejor servicio y asesoramiento.
          </p>

          <h3>Nuestra Visión</h3>
          <p>
            Ser la ferretería de referencia en la región, ofreciendo siempre productos innovadores y un servicio excepcional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
