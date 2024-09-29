import React from "react";
import Navbar from "../components/NavBar";
import '../styles/Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="imagePublicidad1-container">
                <div className="columna-1">
                    <div className="contenido-columna">
                        <p><b><em>Elegancia y Fe en Cada Pieza</em></b></p>
                    </div>
                </div>
                <div className="columna-2">
                    <div className="contenido-columna">
                        <p><b><em>Tu Reflejo en Cada Joya</em></b></p>
                    </div>
                </div>
            </div>
            <div className="imagePublicidad3-container">
                <div className="columna-3">
                    <div className="contenido-columna">
                        <p><b><em>Uniendo Sueños, Sellando Amor</em></b></p>
                    </div>
                </div>
                <div className="columna-4">
                    <div className="contenido-columna">
                        <p><b><em>Elegancia que Enamora</em></b></p>
                    </div>
                </div>
            </div>

            <div className="imagePublicidad2-container">
                <img className="discount-imagePublicidad2" />
                <div className="mensaje">
                    <p><b><em>Encantos que Brillan Contigo</em></b></p>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-column">
                    <h4>Sobre Nuestra Joyería</h4>
                    <p>Ofrecemos una amplia variedad de joyas de alta calidad y accesorios, diseñadas para cada ocasión. Visítanos para descubrir piezas únicas y atemporales.</p>
                    <p>Envío seguro a todo colombia</p>
                    <p>Telefono: +57 310 408 66 85</p>
                    <p>Email: rblanchar@unicesar.edu.co</p>
                </div>
                <div className="footer-column">
                    <h4>Síguenos en</h4>
                    <div className="social-icons">
                        <div>
                            <img
                                src="http://localhost:3001/imagenes/Social/facebook.png"
                                alt="logoFace"
                                className="social-icons-img"
                            />
                            <img
                                src="http://localhost:3001/imagenes/Social/instagram.png"
                                alt="logoInstagram"
                                className="social-icons-img"
                            />
                            <img
                                src="http://localhost:3001/imagenes/Social/x.png"
                                alt="logoX"
                                className="social-icons-img"
                            />
                        </div>
                    </div>
                </div>
            </footer>



        </div>
    );
};

export default Dashboard;