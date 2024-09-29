import React, { useState } from "react";
import Navbar from "../components/NavBar";
import { authApi } from "../common";
import '../styles/Registers.css';
import toastr from 'toastr';
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        name: "",
        lastName: "",
        phone: "",
        address: "",
        password: ""
    });
    const [mensaje, setMensaje] = useState("");

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(authApi.register.url, {
                method: authApi.register.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                toastr.success(data.message)
                navigate('/login');
            } else {
                setMensaje(data.error);
            }
        } catch (error) {
            console.error("Error al registrarse: ", error.message);

            setMensaje("Ocurrió un error, intenta más tarde");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRCli">
                <div className="containerRCli">
                    <div id="mensaje">{mensaje}</div>
                    <h2 className="tituloU-C">Registrarse</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRU">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input
                                className="inputU"
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="two-column-container">
                            <div className="form_controlRU">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="lastName">Apellidos:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="form_controlRU">
                            <label htmlFor="phone">Número de celular:</label>
                            <input
                                className="inputU"
                                type="number"
                                id="phone"
                                name="phone"
                                value={user.phone}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form_controlRU">
                            <label htmlFor="address">Dirección:</label>
                            <input
                                className="inputU"
                                type="text"
                                id="address"
                                name="address"
                                value={user.address}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form_controlRU">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                className="inputUCli"
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleInput}
                            />
                        </div>
                        <button className="btn-submitRM">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
