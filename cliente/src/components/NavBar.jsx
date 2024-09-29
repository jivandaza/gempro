import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCarrito } from "../context/CarritoContext";
import { ROLE } from './../constants/index';
import "../styles/NavBar.css";

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState("");
  const auth = useAuth();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
    setSubmenuVisible("");
  };

  const handleSubmenuEnter = (menu) => {
    setSubmenuVisible(menu);
  };

  const handleSubmenuLeave = () => {
    setSubmenuVisible("");
  };

  const { carrito } = useCarrito();
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const userRole = auth?.user ? auth?.user?.role : null;

  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="logo">
            <NavLink to="/dashboard">
              <h1>JOYERIA D'LAURA</h1>
            </NavLink>
          </div>
          <div className="menu-items">
            <ul>
              {userRole === ROLE.ADMIN && (
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="dropdown"
                >
                  <li style={{cursor: "pointer"}}>Administrar</li>
                  {dropdownVisible && (
                    <ul className="dropdown-menu">
                      <li onMouseEnter={() => handleSubmenuEnter('Registrar')} onMouseLeave={handleSubmenuLeave} style={{cursor: "pointer"}}>
                        Crear
                        {submenuVisible === 'Registrar' && (
                          <ul className="submenu">
                            <li><NavLink to="/crear/material">Material</NavLink></li>
                            <li><NavLink to="/crear/categoria">Categoría</NavLink></li>
                            <li><NavLink to="/crear/producto">Producto</NavLink></li>
                          </ul>
                        )}
                      </li>
                      <li onMouseEnter={() => handleSubmenuEnter('Consultar')} onMouseLeave={handleSubmenuLeave} style={{cursor: "pointer"}}>
                        Consultar
                        {submenuVisible === 'Consultar' && (
                          <ul className="submenu">
                            <li><NavLink to="/consultar/productos">Productos</NavLink></li>
                            <li><NavLink to="/consultar/facturas">Facturas</NavLink></li>
                            <li><NavLink to="/consultar/clientes">Clientes</NavLink></li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </li>
              )}
              {userRole === ROLE.CLIENTE && (
                  <>
                    <li>
                      {totalProductos > 0 ? (
                          <NavLink to="/carrito">Carrito ({totalProductos})</NavLink>
                      ) : (
                          <NavLink to="/carrito">Carrito</NavLink>
                      )}
                    </li>
                    <li>
                      <NavLink to='/compras'>Compras</NavLink>
                    </li>
                  </>
              )}
              {
                  (!auth?.user || userRole === ROLE.CLIENTE) && (
                      <>
                        <li>
                          <NavLink to="/categorias">Categorías</NavLink>
                        </li>
                        <li>
                          <NavLink to="/acerda-de">Acerca De</NavLink>
                        </li>
                      </>
                  )
              }
              <li>
                {auth.user ? (
                  <NavLink to={'/'} onClick={() => {
                    auth.logOut();
                  }}>Salir</NavLink>
                ) : (
                  <NavLink to="/login">Ingresar</NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
