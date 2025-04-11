import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {build, perBuild} from '@jackfranklin/test-data-bot';
import Login from '../sharedComponent/Login';

// This can be any fake data library you like.
import fake from 'faker';

const userBuilder = build({
  fields:{
    username: perBuild(() => fake.internet.userName()), // Updated to use the correct faker method
    password: perBuild(() => fake.internet.password()), // Updated to use the correct faker method
  }
})

test('should submit the form with dynamic generated values', async() => {
    const { username, password }  = userBuilder();

    const handleSubmit = jest.fn();

    render(<Login onSubmit = {handleSubmit}/>);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', {name:/submit/i});

    await userEvent.type(usernameInput, username);
    await userEvent.type(passwordInput, password)

    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
        username,
        password,
    });
});