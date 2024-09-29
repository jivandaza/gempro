import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useCarrito } from "../context/CarritoContext";
import "../styles/Products.css";

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();
  const [total, setTotal] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    calcularTotal(carrito);
    calcularCantidadTotal(carrito);
  }, [carrito]);

  const calcularTotal = (carrito) => {
    let totalCalculado = carrito.reduce((accumulator, current) => {
      return accumulator + (current?.totalValue || 0);
    }, 0);
    setTotal(totalCalculado);
  };

  const calcularCantidadTotal = (carrito) => {
    let cantidadCalculada = carrito.reduce((accumulator, current) => {
      return accumulator + (current?.quantity || 0);
    }, 0);
    setTotalProduct(cantidadCalculada);
  };

  const handleRealizarCompra = () => {
    navigate("/factura", { state: { total: total, totalProduct, carrito: carrito } });
  };

  return (
    <div>
      <Navbar />
      <div className="prodSeleccionadoContainer">
        <h2 className="tituloPrdSel">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div className="carritoContainer">
            <table className="tablaCarrito">
              <thead>
                <tr>
                  <th></th>
                  <th className="tituloCarritoImg">Imagen</th>
                  <th className="thtituloCarritoCompra">Nombre</th>
                  <th className="thtituloCarritoCompra">Valor Unitario</th>
                  <th className="thtituloCarritoCompra">Cantidad</th>
                  <th className="thtituloCarritoCompra">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((product, index) => (
                  <tr key={product?._id + index}>
                    <td>
                      <button className="buttonEliProdCarr" onClick={() => eliminarDelCarrito(index)}>X</button>
                    </td>
                    <td>
                      <img
                        className="imagenProdSelecionadoP"
                        src={product?.image}
                        alt={product?.name}
                      />
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">{product?.name}</div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">
                        $ {product?.unitValue.toLocaleString('es-ES')}
                      </div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">{product?.quantity}</div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">
                        $ {product?.totalValue ? product?.totalValue.toLocaleString('es-ES') : '0'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="tablaResumen">
            <div className="tituloCarritoCompra" style={{ font: '16px Arial', fontWeight: 'bold' }}>RESUMEN DE COMPRA</div>
              <div className="totalCarrito">Cantidad de productos: {totalProduct}</div>
              <div className="totalCarrito">Subtotal: $ {total.toLocaleString('es-ES')}</div>
              <div className="totalCarrito">IVA (19%): $ {(total * 0.19).toLocaleString('es-ES')}</div>
              <div className="totalCarrito">Total a pagar: $ {(total * 1.19).toLocaleString('es-ES')}</div>
              <button className="btn-submitCarritoCompra" onClick={handleRealizarCompra}>
                Realizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
