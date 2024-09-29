import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App'; // Asegúrate de que la ruta sea la correcta hacia App.js
import { useAuth } from '../AuthProvider'; // Asegúrate de importar correctamente el contexto de autenticación

// Mockear el hook useAuth
jest.mock('../AuthProvider', () => ({
    useAuth: jest.fn(),
}));

// Mockear ScrollToTop
jest.mock('../components/ScrollToTop', () => () => <div data-testid="scroll-to-top" />);

// Mockear jwtDecode
jest.mock('jwt-decode', () => jest.fn(() => ({ id: 'test-user-id' })));

// Mockear fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ user: { id: 'test-user-id', name: 'Test User' } }),
    })
);

describe('App Component', () => {
    beforeEach(() => {
        // Resetear mocks antes de cada prueba
        fetch.mockClear();
        useAuth.mockReturnValue({
            user: null,
            setUser: jest.fn(),
        });
    });

    test('Renderiza el Dashboard por defecto', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        // Verificar que el Dashboard se ha renderizado
        const dashboardElement = screen.getByText(/dashboard/i); // Usa el texto que aparezca en tu componente Dashboard
        expect(dashboardElement).toBeInTheDocument();
    });

    test('Debe llamar a useAuth y verificar el usuario en el localStorage', async () => {
        const setUserMock = jest.fn();

        // Simular que hay un token en localStorage
        localStorage.setItem('site', 'fake-token');

        useAuth.mockReturnValue({
            user: null,
            setUser: setUserMock,
        });

        render(
            <MemoryRouter initialEntries={['/dashboard']}>
                <App />
            </MemoryRouter>
        );

        // Esperar a que se realice el fetch y se establezca el usuario
        await waitFor(() => {
            expect(setUserMock).toHaveBeenCalled();
        });
    });
});
