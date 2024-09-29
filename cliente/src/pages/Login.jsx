import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import toastr from 'toastr';
import "../styles/Login.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");
  const { loginAction } = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        const response = await loginAction(input);
        if (response.success) {
            setMensaje("");
            toastr.success(response.message);
        } else {
            setMensaje(response.error);
        }
    };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="backgroundLG">
        <div className="login-containerLG">
          <div id="mensaje" data-testid="message-test">{mensaje}</div>
          <h2>Inicio de Sesión</h2>
          <form id="datos" onSubmit={handleSubmitEvent}>
            <div className="form_controlLG">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                aria-describedby="email"
                aria-invalid="false"
                data-testid="email-input"
                placeholder="Correo electrónico"
                onChange={handleInput}
              />
              <div id="email" className="sr-onlyLG"></div>
            </div>
            <div className="form_controlLG">
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                name="password"
                aria-describedby="password"
                aria-invalid="false"
                data-testid="password-input"
                placeholder="Contraseña"
                onChange={handleInput}
              />
              <div id="password" className="sr-onlyLG"></div>
            </div>
            <div className="registrarse">
              ¿Aún no tienes una cuenta?
              <NavLink to="/register" className="enlace">
                <span className="negrita"> Registrarse</span>
              </NavLink>
            </div>
            <button className="btn-submitLG">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
