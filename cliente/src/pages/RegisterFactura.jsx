import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import { useCarrito } from "../context/CarritoContext";
import "../styles/Registers.css";
import Swal from "sweetalert2";
import toastr from 'toastr';
import {facturaApi} from "../common";

const RegisterFactura = () => {
    const location = useLocation();
    const { limpiarCarrito } = useCarrito();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const totalProduct = location.state?.totalProduct;
    const subTotal = location.state?.total || 0;
    const iva = subTotal * 0.19;
    const totalPayment = subTotal + iva;

    const carrito = location.state?.carrito || [];

    const [receipt, setReceipt] = useState({
        idUser: user?._id,
        subTotal,
        iva,
        totalPayment,
        totalProduct,
        products: carrito
    });

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        try {
            // Registrar la factura
            const response = await fetch(facturaApi.registerFactura.url, {
                method: facturaApi.registerFactura.method,
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(receipt),
            });

            const data = await response.json();

            if (response.ok) {
                limpiarCarrito();
                Swal.fire({
                    title: data?.message,
                    text: "Su pedido será entregado en Max 48 horas",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/dashboard");
                });
            } else {
                toastr.error(data?.error)
            }
        } catch (error) {
            toastr.error('Ocurrió un error al registrar una compra');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRCli">
                <div className="containerRCli">
                    <h2 className="tituloU-C">Confirmación de Compra</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                                Nombre: {`${user?.name} ${user?.lastName}`}
                            </p>
                            <p style={{ fontSize: '16px', color: '#555' }}>
                                Dirección: {user?.address}
                            </p>
                            <p style={{ fontSize: '16px', color: '#555' }}>
                                Teléfono: {user?.phone}
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                                Subtotal: ${subTotal.toLocaleString("es-ES")}
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                                IVA: ${iva.toLocaleString("es-ES")}
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#d9534f' }}>
                                Total a Pagar: ${totalPayment.toLocaleString("es-ES")}
                            </p>
                        </div>
                        <button className="btn-submitImgSel"
                        style={{
                            marginBottom: '10px'
                        }}>Realizar Compra</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterFactura;
