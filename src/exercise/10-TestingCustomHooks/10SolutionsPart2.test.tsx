import { act } from "react";
import { render } from "@testing-library/react";
import React from "react";
import useCounter from "../sharedComponent/useCounter";

let result: ReturnType<typeof useCounter>;

export function TestComponent() {
    result = useCounter();
    return null;
}

test('useCounter returns initial state and updates correctly', () => {
    render(<TestComponent/>)
    expect(result.count).toBe(0);
    act(() => {
        result.increment();
    });
    expect(result.count).toBe(1);
    act(() => {
        result.decrement();
    });
    expect(result.count).toBe(0);
})