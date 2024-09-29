import React, {useEffect, useState} from 'react';
import Navbar from "../components/NavBar";
import "../styles/Products.css";
import {facturaApi} from "../common";
import toastr from "toastr";
import {useAuth} from "../AuthProvider";

const Compras = () => {

    const {token, user, logOut} = useAuth();
    const [compras, setCompras] = useState([]);

    const fetchMisCompras = async () => {
        try {
            const response = await fetch(`${facturaApi.getAllFacturasByUser.url}/${user?._id}`, {
                method: facturaApi.getAllFacturasByUser.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setCompras(data.facturas);
            } else if (response.status === 500) {
                toastr.error(data.error);
            } else {
                logOut();
                toastr.info(data.message);
            }
        } catch (error) {
            console.log(error.message || error);
            toastr.error('Ocurrió un error al mostrar las compras');
        }
    };

    useEffect(() => {
        fetchMisCompras();
    }, []);


    return (
        <>
            <Navbar />
            <div className="prodSeleccionadoContainer">
                <h2 className="tituloPrdSel">Mis Compras</h2>
                {compras.length === 0 ? (
                    <p>No ha realizado ninguna compra.</p>
                ) : (
                    <>
                        {
                            compras.map((compra, index) => {
                                return (
                                    <>
                                        <hr style={{ border: '0 solid #555', width: '100%', height: '2px', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }} />
                                        <div className="carritoContainer" key={compra?._id + index}>
                                            <table className="tablaCarrito">
                                                <thead>
                                                <tr>
                                                    <th className="tituloCarritoImg">Imagen</th>
                                                    <th className="thtituloCarritoCompra">Nombre</th>
                                                    <th className="thtituloCarritoCompra">Valor Unitario</th>
                                                    <th className="thtituloCarritoCompra">Cantidad</th>
                                                    <th className="thtituloCarritoCompra">Valor Total</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {compra?.products.map((product, index) => (
                                                    <tr key={product?._id + index}>
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
                                                <div className="totalCarrito">Fecha: {new Date(compra?.updatedAt).toLocaleDateString('es-ES')}</div>
                                                <div className="totalCarrito">Cantidad de productos: {compra?.totalProduct}</div>
                                                <div className="totalCarrito">Subtotal: $ {compra?.subTotal.toLocaleString('es-ES')}</div>
                                                <div className="totalCarrito">IVA (19%): $ {compra?.iva.toLocaleString('es-ES')}</div>
                                                <div className="totalCarrito">Total a pagar: $ {compra?.totalPayment.toLocaleString('es-ES')}</div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </>
                )}
            </div>
        </>
    );
};

export default Compras;
