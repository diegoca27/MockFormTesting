import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../sharedComponent/theme';
import EasyButton from '../sharedComponent/EasyButton';

// Custom Wrapper function for ThemeProvider
function Wrapper({ theme = 'light', children }) {
  return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
}

describe('EasyButton', () => {
  // Test for light theme
  test('renders with light theme', () => {
    render(<EasyButton>Click Me</EasyButton>, { 
      wrapper: (props) => <Wrapper theme="light" {...props} /> 
    });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveAttribute('style');
    const buttonStyle = button.style;
    expect(buttonStyle.backgroundColor).toBe('white');
    expect(buttonStyle.color).toBe('black');
  });

  // Test for dark theme
  test('renders with dark theme', () => {
    render(<EasyButton>Click Me</EasyButton>, { 
      wrapper: (props) => <Wrapper theme="dark" {...props} /> 
    });
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveAttribute('style');
    const buttonStyle = button.style;
    expect(buttonStyle.backgroundColor).toBe('black');
    expect(buttonStyle.color).toBe('white');
  });
});