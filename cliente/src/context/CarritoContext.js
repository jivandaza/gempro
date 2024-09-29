import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (product) => {
    setCarrito((prevCarrito) => [...prevCarrito, product]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prevCarrito) => prevCarrito.filter((_, i) => i !== index));
  };

  const limpiarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
