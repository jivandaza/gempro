import React, {useState, useEffect, useRef} from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/CreateProduct.css';
import {categoryApi, materialApi, productApi} from "../common";
import toastr from "toastr";
import {uploadImageCloudinary} from "../helpers/fetchImage";

const CreateProduct = () => {

    const auth = useAuth();
    const fileInputRef = useRef(null);

    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        cost: '',
        margin: '',
        category: '',
        material: '',
        description: '',
        image: ''
    });
    const [categories, setCategories] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [mensaje, setMensaje] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const image = await uploadImageCloudinary(file);

            setProduct((previousValue)=> {
                return {
                    ...previousValue,
                    image: image.url
                };
            });
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(categoryApi.getAllCategories.url, {
                    method: categoryApi.getAllCategories.method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setCategories(data.categories);
                } else if (response.status === 500) {
                    setMensaje(data.error);
                } else {
                    auth.logOut();
                    toastr.info(data.message);
                }
            } catch (error) {
                setMensaje('Ocurrió un error, al cargar las categorías');
            }
        };

        fetchCategories();
    }, [auth.token]);

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const response = await fetch(materialApi.getAllMateriales.url, {
                    method: materialApi.getAllMateriales.method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setMateriales(data.materiales);
                } else if (response.status === 500) {
                    setMensaje(data.error);
                } else {
                    auth.logOut();
                    toastr.info(data.message);
                }
            } catch (error) {
                setMensaje('Ocurrió un error, al cargar los materiales');
            }
        };

        fetchMateriales();
    }, [auth.token]);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(productApi.createProduct.url, {
                method: productApi.createProduct.method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(product),
            });

            console.log(product.image)

            const data = await response.json();

            if (response.ok) {
                toastr.success(data?.message);
                setProduct({
                    name: '',
                    quantity: '',
                    cost: '',
                    margin: '',
                    category: '',
                    material: '',
                    description: '',
                    image: ''
                });
                fileInputRef.current.value = null;
            } else if (response.status === 500 || response.status === 400) {
                setMensaje(data.error);
            } else {
                auth.logOut();
                toastr.info(data.message);
            }
        } catch (error) {
            setMensaje('Ocurrió un error, al crear un producto');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRP">
                <div className="containerProduct">
                    {<div id="mensaje">{mensaje}</div>}
                    <h2>Crear Producto</h2>
                    <form className="product-form" onSubmit={handleSubmitEvent}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Nombre:</label>
                                <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Cantidad:</label>
                                <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cost">Costo:</label>
                                <input type="number" id="cost" name="cost" value={product.cost} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="margin">Margen de Ganancia:</label>
                                <input type="number" id="margin" name="margin" value={product.margin} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category">Categoría:</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={product?.category}
                                    onChange={handleChange}
                                    style={{
                                        textTransform: 'Capitalize'
                                    }}
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {
                                        categories.map((category, index) => {
                                            return (
                                                <option
                                                    key={category?._id + index}
                                                    value={category?._id}
                                                    style={{textTransform: 'Capitalize'}}
                                                >{category?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="material">Material:</label>
                                <select
                                    id="material"
                                    name="material"
                                    value={product.material}
                                    onChange={handleChange}
                                    style={{
                                        textTransform: 'Capitalize'
                                    }}
                                >
                                    <option value="">Selecciona un material</option>
                                    {
                                        materiales.map((material, index) => {
                                            return (
                                                <option
                                                    key={material?._id + index}
                                                    value={material?._id}
                                                    style={{textTransform: 'Capitalize'}}
                                                >{material?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="description">Descripción:</label>
                                <textarea id="description" name="description" value={product.description} onChange={handleChange}  />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Imagen:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                    ref={fileInputRef}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <button type="submit" className="btn-create">Crear</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
