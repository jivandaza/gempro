import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/NavBar";
import '../styles/Categoria.css';
import {categoryApi} from "../common";

const Categories = () => {

   const [isLoading, setIsLoading] = useState(false);
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      const fetchGetAllCategory = async () => {
         setIsLoading(true);
         const response = await fetch(categoryApi.getAllCategories.url, {
            method: categoryApi.getAllCategories.method,
            credentials: 'include'
         });

         const data = await response.json();

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
                    categories.map((category, index) => {
                       return (
                           <NavLink
                               key={category?._id + index}
                               to={`/categoria/${category.name.replace(/\s+/g, '-')}`}
                               className="opcionC"
                               style={{
                                  backgroundImage: `url(${category.image})`,
                                  transition: 'transform 0.3s ease'
                               }}
                           >
                              <div className="categoriaTexto">
                                 {category.name}
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

export default Categories;
