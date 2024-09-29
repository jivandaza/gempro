import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/Registers.css';
import {materialApi} from "../common";
import toastr from 'toastr';

const CreateMaterial = () => {
    const [material, setMaterial] = useState({ name: "" });
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(materialApi.createMaterial.url, {
                method: materialApi.createMaterial.method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(material),
            });

            const data = await response.json();

            if (response.ok) {
                toastr.success(data.message);
                setMaterial({ name: "" });
                setMensaje('');
            } else if (response.status === 400 || response.status === 500) {
                setMensaje(data.error);
            } else {
                auth.logOut();
                toastr.info(data.message);
            }
        } catch (error) {
            setMensaje('Ocurrió un error, al crear un material');
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMaterial((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRM">
                <div className="containerRM">
                    <div id="mensaje">{mensaje}</div>
                    <h2>Crear Material</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRM">
                            <label htmlFor="name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={material.name}
                                onChange={handleInput}
                            />
                        </div>
                        <button className="btn-submitRM">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateMaterial;
