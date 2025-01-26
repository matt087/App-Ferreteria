import Cards from "./Cards";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });
    }, []);
    return (
        <>
          <h2 className="title-products">Lo más vendido!</h2>
          <main className="container-productos">
            {products.map((product) => (
              <Cards 
                key={product._id} 
                name={product.name} 
                description={product.description} 
                ruta={product.image} 
              />
            ))}
          </main>
        </>
      );

}

export default Products