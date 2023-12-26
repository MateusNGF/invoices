// ButtonAction.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonComponent from '../ButtonComponent';

describe('ButtonComponent Testing', () => {
  test('Render with text "Click me" when provider text', () => {

    const { getByText } = render(
      <ButtonComponent label="Click me"/>
    );
    const buttonComponent = getByText('Click me');

    expect(buttonComponent).toBeInTheDocument();
  });

  test('Render with class correct when provider type and size', () => {

    const { getByText } = render(
      <ButtonComponent type="sucess" label="Click me" size="small" />
    );
    const buttonComponent = getByText('Click me');

    expect(buttonComponent).toBeInTheDocument();
    expect(buttonComponent).toHaveClass('btn-type-sucess');
    expect(buttonComponent).toHaveClass('btn-size-small');
  });

  test('calls onClick prop when button is clicked one time', () => {
    const onClickMock = jest.fn();

    const { getByText } = render(
      <ButtonComponent  onClick={onClickMock} label="Click me"  />
    );
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
