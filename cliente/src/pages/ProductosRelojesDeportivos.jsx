import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
// import { useAuth } from "../AuthProvider"; // Comentario: No se utiliza la autenticación en este componente
import { useNavigate } from "react-router-dom";
import '../styles/Products.css';

const ProductosRelojesDeportivos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  // const auth = useAuth(); // Comentario: No se utiliza la autenticación en este componente

  useEffect(() => {
    fetch("http://localhost:3000/producto", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": auth.token, // Comentario: No se utiliza la autenticación en este componente
      },
    })
      .then((res) => res.json())
      .then((datos) => {
        const productosFiltrados = datos.data.filter(producto => (
          producto.ID_CATEGORIA === '205' && producto.CANTIDAD > 0
        ));
        setProductos(productosFiltrados);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []); // Comentario: No se utiliza la autenticación en este componente

  const handleImageClick = (idProduct, productName, imageUrl, costo, cantidad, margen_ganancia) => {
    navigate("/productoSeleccionado", {
      state: { idProduct, productName, imageUrl, costo, cantidad, margen_ganancia }
    });
  };

  return (
    <div>
      <Navbar />
      <h3 className="titlePRODUCTOS">RELOJES DEPORTIVOS</h3>
      <div className="containerPRODCUTOS">
        {productos.map((producto) => (
          <div
            key={producto.ID_PRODUCTO}
            className="opcionPROD"
            onClick={() => handleImageClick(
              producto.ID_PRODUCTO, producto.DESCRIPCION,
              `${process.env.REACT_APP_URL_IMG}${producto.IMAGEN}`, 
              producto.COSTO, producto.CANTIDAD, producto.MARGEN_GANANCIA
            )}
          >
            <img 
              className="imagenProdSelecionadoP" 
              src={`${process.env.REACT_APP_URL_IMG}${producto.IMAGEN}`} 
              alt={producto.DESCRIPCION} 
            />
            <div className="productoTexto">{producto.DESCRIPCION}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosRelojesDeportivos;
