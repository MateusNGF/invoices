// MyComponent.test.js
import React from 'react';
import { render  } from '@testing-library/react';
import LoadComponent from '../LoadComponent';


describe('LoadComponent Testing', () => {
  test('Render with text "Carregando..." when not provider text', () => {
    const { getByText } = render(<LoadComponent />);

    const loadComponent = getByText('Carregando...')
    expect(loadComponent).toBeInTheDocument();
  });
  test('Render with text "Processando Faturas..." when provider text', () => {
    const title = 'Processando Faturas...'

    const { getByText } = render(<LoadComponent title={title} />);

    const loadComponent = getByText(title)

    expect(loadComponent).toBeInTheDocument();
  });
})
