import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../AuthProvider';
import { CarritoProvider } from '../context/CarritoContext';
import Login from '../pages/Login';

describe('Login Component', () => {
    test('Renderiza el formulario de inicio de sesión', () => {
        const mockLoginAction = jest.fn(); // Simulación de la acción de inicio de sesión

        render(
            <MemoryRouter>
                <CarritoProvider>
                    <AuthProvider value={{ loginAction: mockLoginAction }}>
                        <Login />
                    </AuthProvider>
                </CarritoProvider>
            </MemoryRouter>
        );

        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('Muestra un mensaje de error cuando la acción de inicio de sesión falla', async () => {
        const mockLoginAction = jest.fn().mockResolvedValue();

        render(
            <MemoryRouter>
                <CarritoProvider>
                    <AuthProvider value={{ loginAction: mockLoginAction }}>
                        <Login />
                    </AuthProvider>
                </CarritoProvider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByTestId('password-input'), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        const mensajeDiv = await screen.findByTestId('message-test');
        expect(mensajeDiv).toHaveTextContent('El correo electrónico no existe');
    });

    test('Llama a loginAction y muestra un mensaje de éxito cuando el inicio de sesión es exitoso', async () => {
        const mockLoginAction = jest.fn().mockResolvedValue({ success: true, message: 'Inicio de sesión exitoso' });

        render(
            <MemoryRouter>
                <CarritoProvider>
                    <AuthProvider value={{ loginAction: mockLoginAction }}>
                        <Login />
                    </AuthProvider>
                </CarritoProvider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('email-input'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByTestId('password-input'), {
            target: { value: '123456' },
        });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        const successMessage = await screen.findByText(/inicio de sesión exitoso/i);
        expect(successMessage).toBeInTheDocument();
    });
});
