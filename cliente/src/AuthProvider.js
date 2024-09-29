import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "./context/CarritoContext";
import { authApi } from "./common";
import toastr from 'toastr';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const { limpiarCarrito } = useCarrito();

    const loginAction = async (userFrm) => {
        try {
            const response = await fetch(authApi.login.url, {
                method: authApi.login.method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userFrm),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("site", data.token);
                navigate("/dashboard");
                return { success: true, message: data.message };
            } else if (response.status === 500 || response.status === 400) {
                return {error: data.error}
            } else {
                logOut();
                toastr.error(data.error);
            }
        } catch (error) {
            return { success: false, error: 'Error al iniciar sesión' };
        }
    }

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    limpiarCarrito();
    navigate('/dashboard');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};