import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { useAuth } from "../AuthProvider";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/Products.css';
import {productApi} from "../common";
import toastr from 'toastr';

const ProductsByCategory = () => {

    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const auth = useAuth();

    const getAllProductsByCategory = async () => {
        const response = await fetch(`${productApi.getAllProductsByCategory.url}/${category}`, {
            method: productApi.getAllProductsByCategory.method,
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();

        if (response.ok) {
            const productsFilter = data.products.filter(product => product.quantity > 0);
            setProducts(productsFilter);
        } else
            navigate('/categorias');
        if (data.products.length === 0){
            toastr.info('No hay productos en la categoría')
            navigate('/categorias');
        }
    };

    useEffect(() => {
        getAllProductsByCategory();
    }, [auth.token]);

    const handleImageClick = (product) => {
        navigate("/productSelect", {
            state: { product }
        });
    };

    return (
        <div>
            <Navbar />
            <div className="containerPRODCUTOS">
                {products.map((product, index) => (
                    <div
                        key={product._id + index}
                        className="opcionPROD"
                        onClick={() => handleImageClick(product)}
                    >
                        <img
                            className="imagenProdSelecionadoP"
                            src={product?.image}
                            alt={product?.name}
                        />
                        <div
                            className="productoTexto"
                            style={{
                                textTransform: 'Uppercase'
                            }}
                        >
                            {product?.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsByCategory;
