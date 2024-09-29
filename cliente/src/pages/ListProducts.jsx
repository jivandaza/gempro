import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import Navbar from '../components/NavBar';
import "../styles/ListProducts.css";
import {productApi} from "../common";
import toastr from "toastr";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterQuantity, setFilterQuantity] = useState(false);
    const [imagenAmpliada, setImagenAmpliada] = useState(null);
    const [productSelect, setProductSelect] = useState(null); // Nuevo estado
    const auth = useAuth();

    const formatNumber = (number) => {
        return number.toLocaleString('es-ES');
    };

    const fetchGetAllProducts = async () => {
        try {
            const response = await fetch(productApi.getAllProducts.url, {
                method: productApi.getAllProducts.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setProducts(data?.products);
            } else if (response.status === 500) {
                setMensaje(data.error);
            } else {
                auth.logOut();
                toastr.info(data.message);
            }
        } catch (error) {
            setMensaje('Ocurrió un error al cargar los productos');
        }
    };

    useEffect(() => {
        fetchGetAllProducts();
    }, [auth.token]);

    const handleFiltroChange = (e) => {
        setFilterName(e.target.value);
    };

    const handleFiltroCantidadChange = (e) => {
        setFilterQuantity(e.target.checked);
    };

    const handleProductoSeleccionado = (producto) => {
        setProductSelect(producto);
    };

    const closeModal = () => {
        setProductSelect(null);
        setImagenAmpliada(null);
    };

    const handleModifyProduct = async () => {
        try {
            const response = await fetch(productApi.modifyProduct.url, {
                method: productApi.modifyProduct.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify(productSelect),
            });

            const data = await response.json();
  
            if (response.ok) {
                closeModal();
                toastr.success(data.message);
                await fetchGetAllProducts();
            } else if (response.status === 500 || response.status === 400) {
                toastr.error(data.error);
            } else {
                auth.logOut();
                toastr.info(data.message);
            }
        } catch (error) {
            toastr.error('Ocurrió un error al modificar el producto');
        }
    };
  
    const openModal = (imagen) => {
        setImagenAmpliada(imagen);
    };

    const filteredProducts = products.filter((product) => {
        const matchName = product?.name.toLowerCase().includes(filterName.toLowerCase());
        const matchQuantity = filterQuantity ? product?.quantity < 3 : true;
        return matchName && matchQuantity;
    });

  return (
    <div>
      <Navbar />
      <div className="backgroundPL">
        <div className="containerPL">
          <h2>Lista de Productos</h2>
          {mensaje && <div id="mensaje">{mensaje}</div>}
          <div className="filtro-container">
            <label htmlFor="filtroDescripcion">Filtrar por Nombre:</label>
            <input
              type="text"
              id="filtroDescripcion"
              name="filtroDescripcion"
              value={filterName}
              onChange={handleFiltroChange}
            />
            <label className="filtroDCantidad" htmlFor="filtroCantidad">Productos con baja cantidad:</label>
            <div style={{
                width: '100%',
            }}>
                <input
                    type="checkbox"
                    id="filtroCantidad"
                    name="filtroCantidad"
                    checked={filterQuantity}
                    onChange={handleFiltroCantidadChange}
                    style={{
                        width: '10%',
                    }}
                />
            </div>
          </div>
          <table className="tablePL">
            <thead>
              <tr>
                <th>#</th>
                <th className='thTituloProd'>Nombre</th>
                <th className='thTituloProd'>Valor Unitario</th>
                <th>Cantidad</th>
                <th className='thTituloProd'>Categoría</th>
                <th className='thTituloProd'>Material</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product?._id + index} onDoubleClick={() => handleProductoSeleccionado(product)}>
                  <td>{index + 1}</td>
                  <td>{product?.name.toUpperCase()}</td>
                  <td>$ {formatNumber(product?.unitValue)}</td>
                  <td>{product?.quantity}</td>
                  <td>{product?.category?.name}</td>
                  <td>{product?.material?.name}</td>
                  <td>
                    {product?.image && (
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="product-image"
                        onClick={() => openModal(product?.image)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {imagenAmpliada && (
            <div className="modalP">
              <div className="modal-contentP">
                <span className="closeP" onClick={closeModal}>&times;</span>
                <img
                  src={`${imagenAmpliada}`}
                  alt="Imagen Ampliada"
                  className="modal-imageP"
                />
              </div>
            </div>
          )}
          {productSelect && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Modificar Producto</h2>
                <label htmlFor="descripcion">Nombre:</label>
                <input
                  type="text"
                  id="descripcion"
                  value={productSelect?.name}
                  onChange={(e) => setProductSelect({ ...productSelect, name: e.target.value })}
                />
                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={productSelect?.quantity}
                  onChange={(e) => setProductSelect({ ...productSelect, quantity: parseInt(e.target.value) })}
                />
                <button className="btn-submitRM" onClick={handleModifyProduct}>Guardar Cambios</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
