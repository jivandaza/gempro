import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import Navbar from '../components/NavBar';
import "../styles/ListFacturas.css";
import {facturaApi} from "../common";
import toastr from "toastr";

const InvoiceList = () => {
    const [facturas, setFacturas] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [filtro, setFiltro] = useState('');
    const [products, setProducts] = useState([]);
    const [detalleFactura, setDetalleFactura] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { token, logOut } = useAuth();

    const formatNumber = (number) => {
        return number.toLocaleString('es-ES');
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await fetch(facturaApi.getAllFacturas.url, {
                    method: facturaApi.getAllFacturas.method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setFacturas(data?.facturas);
                } else if (response.status === 500) {
                    toastr.error(data.error);
                } else {
                    logOut();
                    toastr.info(data.message);
                }
            } catch (error) {
                console.error(error.message || error);
                setMensaje('Ocurrió un error al cargar las facturas');
            }
        };

        fetchFacturas();
    }, [token]);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const filteredFacturas = facturas.filter((factura) => {
        const matchName = factura?.idUser?.name.toLowerCase().includes(filtro.toLowerCase());
        const matchLastName = factura?.idUser?.lastName.toLowerCase().includes(filtro.toLowerCase());
        const matchEmail = factura?.idUser?.email.toLowerCase().includes(filtro.toLowerCase());
        return matchEmail || matchName || matchLastName;
    });

    return (
        <div>
            <Navbar />
            <div className="backgroundPL">
                <div className="containerPL">
                    <h2>Lista de Facturas</h2>
                    {mensaje && <div id="mensaje">{mensaje}</div>}
                    <div className="filtro-container">
                        <label htmlFor="filtro">Filtrar por Cliente (Correo, Nombre o Apellido):</label>
                        <input
                            type="text"
                            id="filtro"
                            name="filtro"
                            value={filtro}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <table className="tablePL">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Correo</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Total Productos</th>
                                <th>Subtotal</th>
                                <th>Total a Pagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFacturas.map((factura, index) => (
                                <tr key={factura?._id+index} onDoubleClick={() => {
                                    setShowModal(true);
                                    setProducts(factura?.products);
                                }}>
                                    <td>{index+1}</td>
                                    <td>{formatDate(factura?.updatedAt)}</td>
                                    <td>{factura?.idUser?.email}</td>
                                    <td>{factura?.idUser?.name}</td>
                                    <td>{factura?.idUser?.lastName}</td>
                                    <td>{factura?.totalProduct}</td>
                                    <td>$ {formatNumber(factura?.subTotal)}</td>
                                    <td>$ {formatNumber(factura?.totalPayment)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showModal && (
                        <div className="modalDetalle">
                            <div className="modal-contentDetalle">
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <h2>Detalle de la Factura</h2>
                                <table className="tablePL">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Valor Unitario</th>
                                            <th>Valor Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={product?._id+index}>
                                                <td>{product?.name}</td>
                                                <td>{product?.quantity}</td>
                                                <td>$ {formatNumber(product?.unitValue)}</td>
                                                <td>$ {formatNumber(product?.totalValue)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoiceList;
