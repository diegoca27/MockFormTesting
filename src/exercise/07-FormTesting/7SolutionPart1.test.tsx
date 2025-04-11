import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Login from '../sharedComponent/Login';

test('test the submit button', () => {
    const testSubmit = jest.fn();
    render(<Login onSubmit={testSubmit}/>);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(usernameInput, {target: {value: 'hola@si.com'}});
    fireEvent.change(passwordInput, {target: {value: '12345'}});
    fireEvent.click(submitButton);
    expect(testSubmit).toHaveBeenCalledWith({
        username: 'hola@si.com',
        password: '12345',
    });
});