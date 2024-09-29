import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import Navbar from '../components/NavBar';
import "../styles/ListClients.css";
import {userApi} from "../common/index";
import toastr from 'toastr';

const ClientList = () => {
    const [clientes, setClientes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [filtro, setFiltro] = useState('');
    const auth = useAuth();

    const fetchClientes = async () => {
        try {
            const response = await fetch(userApi.getAllUsers.url, {
                method: userApi.getAllUsers.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setClientes(data.users);
            } else if (response.status === 500) {
                setMensaje(data.error);
            } else {
                auth.logOut();
                toastr.info(data.message);
            }
        } catch (error) {
            setMensaje('Error al cargar los clientes');
        }
    };

    useEffect(() => {
        fetchClientes();
    }, [auth.token]);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const filteredClientes = clientes.filter((cliente) =>
        cliente.email.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.name.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.lastName.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="backgroundPL">
                <div className="containerPL">
                    <h2>Lista de Clientes</h2>
                    {mensaje && <div id="mensaje">{mensaje}</div>}
                    <div className="filtro-container">
                        <label htmlFor="filtro">Filtrar por Correo, Nombre o Apellidos:</label>
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
                                <th>#</th>
                                <th>Correo electrónico</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Celular</th>
                                <th>Dirección</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((cliente, index) => (
                                <tr key={cliente?.id + index}>
                                    <td>{index + 1}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.name}</td>
                                    <td>{cliente.lastName}</td>
                                    <td>{cliente.phone}</td>
                                    <td>{cliente.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientList;
