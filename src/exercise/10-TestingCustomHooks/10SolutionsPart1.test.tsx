import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react'
import useCounter from '../sharedComponent/useCounter';
import '@testing-library/react';
import '@testing-library/jest-dom';

export function UseCounterHook(){
    const { count, increment, decrement } = useCounter();
    
    return(
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

test("Uses CounterHook component and checks if increment and decrement is correct", async () =>{
    const user = userEvent.setup();
    render(<UseCounterHook/>);
    const counter = screen.getByRole('heading', {name: /count: 0/i})
    expect(counter).toBeInTheDocument();
    const incrementButton = screen.getByRole('button', {name: /increment/i});
    const decrementButton = screen.getByRole('button', {name: /decrement/i});
    await user.click(incrementButton);
    expect(screen.getByRole('heading', {name: /count: 1/i})).toBeInTheDocument();
    await user.click(decrementButton);
    expect(screen.getByRole('heading', {name: /count: 0/i})).toBeInTheDocument();
});
