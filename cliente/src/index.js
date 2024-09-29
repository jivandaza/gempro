import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import AuthProvider from "./AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <CarritoProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </CarritoProvider>
        </BrowserRouter>
    </React.StrictMode>
);
