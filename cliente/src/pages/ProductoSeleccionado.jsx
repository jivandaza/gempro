import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useCarrito } from "../context/CarritoContext";
import "../styles/Products.css";
import toastr from 'toastr';

const ProductoSeleccionado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  // Estado local para la cantidad seleccionada
  const [selectQuantity, setSelectQuantity] = useState(1);

  // Obtener funciones del contexto del carrito
  const { agregarAlCarrito, carrito } = useCarrito();

  const total = product?.unitValue * selectQuantity;

  // Cargar el producto seleccionado cuando el componente se monta
  const selectProduct = {
    id: product?._id,
    name: product?.name,
    image: product?.image,
    unitValue: product?.unitValue,
    totalValue: total, // Asegúrate de usar el valor calculado actual
  };

  const agregarProducto = () => {
    // Verificar si el carrito no está vacío y si el producto ya existe
    const existProduct = carrito.length !== 0 && carrito.find(productCar => productCar?.id === selectProduct?.id);

    if (existProduct) {
      toastr.error('El producto ya existe en el carrito');
      navigate(-1);
    } else {
      // Si no existe, añadir al carrito y mostrar mensaje de éxito
      agregarAlCarrito({ ...selectProduct, quantity: selectQuantity });
      toastr.success('Producto añadido al carrito');
      navigate(-1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="prodSeleccionadoContainer">
        <h2 className="tituloPrdSel">
          {product?.name ? product?.name : "No se seleccionó ningún producto"}
        </h2>
        {product ? (
          <div>
            <img
              className="imagenProdSelecionado"
              src={product?.image}
              alt={product?.name}
            />
            <div className="cantidadProdSel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
              <label style={{ marginRight: '20px', margin: '0px 20px 0px 0px' }}>Cantidad:</label>
              <select value={selectQuantity} onChange={(e) => setSelectQuantity(parseInt(e.target.value))}>
                {[...Array(product?.quantity).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>

            <div className="costoProdSel">
              Valor Unitario: $ {product?.unitValue.toLocaleString('es-ES')}
            </div>

            <div className="costoProdSel">
              Valor Total: $ {total.toLocaleString('es-ES')}
            </div>
            <button className="btn-submitImgSel" onClick={agregarProducto}>
              Agregar al Carrito
            </button>
          </div>
        ) : (
          <p>No se seleccionó ninguna imagen.</p>
        )}
      </div>
    </div>
  );
};

export default ProductoSeleccionado;
