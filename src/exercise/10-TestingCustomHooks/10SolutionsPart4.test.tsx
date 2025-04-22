import { renderHook, act } from '@testing-library/react';
import useCounter from '../sharedComponent/useCounter';

test('should allow customization of the initial count', () => {
  const { result } = renderHook(() => useCounter({ initialCount: 5 }));

  expect(result.current.count).toBe(5);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(6);
});

test('should allow customization of the step', () => {
  const { result } = renderHook(() => useCounter({ initialCount: 0, step: 3 }));

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
