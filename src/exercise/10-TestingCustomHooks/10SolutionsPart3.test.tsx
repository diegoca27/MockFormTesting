import useCounter from "../sharedComponent/useCounter"
import { render, act } from "@testing-library/react";
import React from "react";

function setup(initialCount = 0, step = 1){
    const result = { current:{} as ReturnType<typeof useCounter> };

    function TestComponent(){
        result.current = useCounter({initialCount, step});
        return null;
    }

    render(<TestComponent/>)
    return result;
}
test('should allow customization of the initial count', () => {
    const result = setup(5);

    expect(result.current.count).toBe(5);

    act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(6);
});

test('should allow customization of the step', () => {
    const result = setup(0, 3); // initialCount = 0, step = 3
  
    expect(result.current.count).toBe(0);
  
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(3);
  
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
});