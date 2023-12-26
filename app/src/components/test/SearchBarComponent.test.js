import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBarComponent from '../SearchBarComponent';

describe('SearchBarComponent Testing', () => {
  test('Check if render all components of SearchBarComponent', () => {
    const {  getByTestId } = render(<SearchBarComponent />);
    
    const inputText = getByTestId('input-text')
    const inputStartDate = getByTestId('input-start-date');
    const inputEndDate = getByTestId('input-end-date');
    const button = getByTestId('search-button');

    // Verifica se o componente é renderizado corretamente
    expect(button).toBeInTheDocument();
    expect(inputEndDate).toBeInTheDocument();
    expect(inputStartDate).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
  });

  test('Calls onSearch with correct data in inputText when button is clicked', () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent onSearch={mockOnSearch} />
    );

    const inputText = getByTestId('input-text')
    const button = getByTestId('search-button');

    // atribui um valor ao input
    inputText.value = 'Atletico mineiro melhor time'

    // Simula o clique no botão Filtrar
    fireEvent.click(button);

    // Verifica se onSearch foi chamado com os dados corretos
    expect(mockOnSearch).toHaveBeenCalledWith({
      startDate: '',
      endDate: '',
      text: 'Atletico mineiro melhor time',
    });
  });

  test('Calls onSearch with correct data in Input Text and Start Date when button is clicked', () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchBarComponent onSearch={mockOnSearch} />
    );

    const inputText = getByTestId('input-text')
    const inputStartDate = getByTestId('input-start-date');
    const button = getByTestId('search-button');

    // atribui um valor aos inputs
    inputText.value = 'Atletico mineiro melhor time'
    inputStartDate.value = '2023-06'

    // Simula o clique no botão Filtrar
    fireEvent.click(button);

    // Verifica se onSearch foi chamado com os dados corretos
    expect(mockOnSearch).toHaveBeenCalledWith({
      startDate: '2023-06',
      endDate: '',
      text: 'Atletico mineiro melhor time',
    });
  });

  test('Calls onSearch with correct data in Input Text when value is Changed', () => {
    const mockOnSearch = jest.fn();

    const { getByTestId } = render(<SearchBarComponent onSearch={mockOnSearch} />);

    const inputText = getByTestId('input-text')

    // Simula a tecla Enter pressionada no campo
    fireEvent.change(inputText, {  target: { value: '789' } });

    // Verifica se onSearch foi chamado com os dados corretos
    expect(mockOnSearch).toHaveBeenCalledWith({
      startDate: '',
      endDate: '',
      text: '789',
    });
  });

  test('Calls onSearch with correct data in Input Start Date when value is Changed', () => {
    const mockOnSearch = jest.fn();

    const { getByTestId } = render(<SearchBarComponent onSearch={mockOnSearch} />);

    const startDate = getByTestId('input-start-date')

    // Simula a tecla Enter pressionada no campo
    fireEvent.change(startDate, {  target: { value: '2023-06' } });

    // Verifica se onSearch foi chamado com os dados corretos
    expect(mockOnSearch).toHaveBeenCalledWith({
      startDate: '2023-06',
      endDate: '',
      text: '',
    });
  });

  test('Calls onSearch with correct data in Input End Date when value is Changed', () => {
    const mockOnSearch = jest.fn();

    const { getByTestId } = render(<SearchBarComponent onSearch={mockOnSearch} />);

    const endDate = getByTestId('input-end-date')

    // Simula a tecla Enter pressionada no campo
    fireEvent.change(endDate, {  target: { value: '2023-06' } });

    // Verifica se onSearch foi chamado com os dados corretos
    expect(mockOnSearch).toHaveBeenCalledWith({
      startDate: '',
      endDate: '2023-06',
      text: '',
    });
  });

  test('Calls onSearch with correct data in Input Start Date and End Date when button is clicked', () => {
    const mockOnSearch = jest.fn();

    const { getByTestId } = render(<SearchBarComponent onSearch={mockOnSearch} />);

    const startDate = getByTestId('input-start-date')
    const endDate = getByTestId('input-end-date')
    const button = getByTestId('search-button')

    startDate.value = '2023-06'
    endDate.value = '2023-07'

    // Simula a tecla Enter pressionada no campo
    fireEvent.click(button);

    // Verifica se onSearch foi chamado com os dados corretos
    expect(mockOnSearch).toHaveBeenCalledWith({
      startDate: '2023-06',
      endDate: '2023-07',
      text: '',
    });
  });
});
