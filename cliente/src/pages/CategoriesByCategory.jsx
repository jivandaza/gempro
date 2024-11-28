import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import Navbar from "../components/NavBar";
import '../styles/Categoria.css';
import {categoryApi} from "../common";

const CategoriesByCategory = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const fetchGetAllCategory = async () => {
            setIsLoading(true);
            const response = await fetch(`${categoryApi.getAllCategories.url}/${category}`, {
                method: categoryApi.getAllCategories.method,
                credentials: 'include'
            });

            const data = await response.json();

            console.log(data.categories);

            if (response.ok)
                setCategories(data?.categories);
            setIsLoading(false);
        };

        fetchGetAllCategory();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="containerCategorias">
                {
                    categories.length !== 0 && (
                        categories.map((item, index) => {
                            return (
                                <NavLink
                                    key={item?._id + index}
                                    to={`/categorias/${category}/${item.name.replace(/\s+/g, '-')}`}
                                    className="opcionC"
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        transition: 'transform 0.3s ease'
                                    }}
                                >
                                    <div className="categoriaTexto">
                                        {item.name}
                                    </div>
                                </NavLink>
                            )
                        })
                    )
                }
                {
                    !isLoading && categories.length === 0 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh'
                        }}>
                            <p>No existen categorías de productos...</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CategoriesByCategory;