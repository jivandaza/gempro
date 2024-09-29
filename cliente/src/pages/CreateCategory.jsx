import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/Registers.css';
import {categoryApi} from "../common";
import toastr from 'toastr';
import {uploadImageCloudinary} from "../helpers/fetchImage";

const CreateCategory = () => {

    const [previewUrl, setPreviewUrl] = useState(null);
    const [category, setCategory] = useState({ name: "", image: "" });
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(categoryApi.createCategory.url, {
                method: categoryApi.createCategory.method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({
                    name: category.name,
                    image: category.image
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toastr.success(data.message);
                setCategory({ name: '', image: '' });
                setMensaje('');
            } else if (response.status === 400 || response.status === 500) {
                setMensaje(data.error);
            } else {
                auth.logOut();
                toastr.info(data.message);
            }
        } catch (error) {
            setMensaje('Ocurrió un error, al crear una categoría');
        }
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const image = await uploadImageCloudinary(file);

            setCategory((previousValue)=> {
                return {
                    ...previousValue,
                    image: image.url
                };
            });
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCategory((prev) => ({
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
                    <h2>Crear Categoría</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRM">
                            <label htmlFor="categoria-name">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={category.name}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form_controlRM">
                            <div className="image-upload-container">
                                <label htmlFor="imageInput" className="upload-label">
                                    {category.image ? (
                                        <img src={category.image} alt="Preview" className="image-preview" />
                                    ) : (
                                        <div className="placeholder">Cargar Imagen</div>
                                    )}
                                </label>
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    className="upload-input"
                                    onChange={handleUploadImage}
                                />
                            </div>
                        </div>
                        <button className="btn-submitRM">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
