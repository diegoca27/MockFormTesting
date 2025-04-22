import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../sharedComponent/theme';
import EasyButton from '../sharedComponent/EasyButton';

// Custom render method that provides theme context
function renderWithProviders(ui, { theme = 'light', ...options } = {}) {
  function Wrapper({ children }) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
  }
  
  return render(ui, { wrapper: Wrapper, ...options });
}

describe('EasyButton', () => {
  // Test for light theme
  test('renders with light theme', () => {
    renderWithProviders(<EasyButton>Click Me</EasyButton>, { theme: 'light' });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveAttribute('style');
    const buttonStyle = button.style;
    expect(buttonStyle.backgroundColor).toBe('white');
    expect(buttonStyle.color).toBe('black');
  });

  // Test for dark theme
  test('renders with dark theme', () => {
    renderWithProviders(<EasyButton>Click Me</EasyButton>, { theme: 'dark' });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveAttribute('style');
    const buttonStyle = button.style;
    expect(buttonStyle.backgroundColor).toBe('black');
    expect(buttonStyle.color).toBe('white');
  });
});