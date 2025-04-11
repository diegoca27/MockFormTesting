import React from 'react';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import { setupServer } from 'msw/node';
import LoginSubmission from '../sharedComponent/LoginSubmission'

const server = setupServer(
    rest.post("https://auth-provider.example.com/api/login", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({username: "testuser"}));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should display username after successful login", async() => {
    render(<LoginSubmission/>);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByText(/Welcome testuser/i)).toBeInTheDocument();
})

test('should display spinner while request is pending', async () => {
    render(<LoginSubmission />);
  
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
  
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
  
    // Verificar que el spinner se muestra mientras se procesa la solicitud
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('should display error message when login fails', async () => {
    // Simulamos un error en la respuesta del servidor (código 500)
    server.use(
      rest.post('https://auth-provider.example.com/api/login', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      })
    );
  
    render(<LoginSubmission />);
  
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
  
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
  
    // Esperamos que desaparezca el spinner
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  
    // Verificar que se muestra el mensaje de error
    expect(screen.getByRole('alert')).toHaveTextContent('Internal Server Error');
  });