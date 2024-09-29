// src/context/AuthProvider.test.js
import { render, screen, waitFor } from "@testing-library/react";
import AuthProvider, {useAuth} from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import userEvent from "@testing-library/user-event";

// Mockear dependencias
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

jest.mock("../context/CarritoContext", () => ({
    useCarrito: jest.fn(),
}));

// Mock de localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        }
    };
})();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});

describe("Auth Provider", () => {
    let mockNavigate;
    let mockLimpiarCarrito;

    beforeEach(() => {
        // Reiniciar mocks antes de cada test
        mockNavigate = jest.fn();
        mockLimpiarCarrito = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        useCarrito.mockReturnValue({ limpiarCarrito: mockLimpiarCarrito });
        localStorage.clear();
        fetch.resetMocks();
    });

    const TestComponent = () => {
        const { loginAction, logOut } = useAuth();
        return (
            <div>
                <button onClick={() => loginAction({ username: "test", password: "password" })}>
                    Login
                </button>
                <button onClick={logOut}>Logout</button>
            </div>
        );
    };

    it("Debe iniciar sesión correctamente y almacenar el token en localStorage", async () => {
        const mockUser = { user: { name: "Test User" }, token: "123abc", message: "Login success" };
        fetch.mockResponseOnce(JSON.stringify(mockUser), { status: 200 });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Simular click en el botón de login
        userEvent.click(screen.getByText("Login"));

        // Verificar si se ha llamado al API de login
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        // Verificar que el token y el usuario se hayan guardado
        expect(localStorage.getItem("site")).toBe("123abc");
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    it("Debe manejar un error al intentar iniciar sesión", async () => {
        const mockError = { error: "Credenciales inválidas" };
        fetch.mockResponseOnce(JSON.stringify(mockError), { status: 400 });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Simular click en el botón de login
        userEvent.click(screen.getByText("Login"));

        // Esperar al resultado
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        // Verificar que el localStorage no guarde ningún token
        expect(localStorage.getItem("site")).toBeNull();
    });

    it("Debe cerrar sesión correctamente y limpiar el carrito", async () => {
        localStorage.setItem("site", "123abc");

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Simular click en el botón de logout
        userEvent.click(screen.getByText("Logout"));

        // Verificar si el usuario y el token se eliminan
        expect(localStorage.getItem("site")).toBeNull();
        expect(mockLimpiarCarrito).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
});
