import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import Discover from './Discover';

let history;

beforeEach(() => {
  history = createBrowserHistory();
});
function MockDiscover() {
  return (
    <Router location={history.location} navigator={history}>
      <Discover />
    </Router>
  );
}
beforeAll(() => {
  const mockUser = { username: 'Anelia', password: '123' };
  window.localStorage.setItem('user', JSON.stringify(mockUser));
});

describe('Discover Page', () => {
  test('should render navigation buttons in discover page', () => {
    render(
      <MockDiscover />,
    );
    const keywordNavigation = screen.getByTestId('keyword-navigation');

    const ingridientsNavigation = screen.getByTestId('ingredients-navigation');

    const nutritionsNavigation = screen.getByTestId('nutritions-navigation');

    expect(keywordNavigation).toBeInTheDocument();
    expect(ingridientsNavigation).toBeInTheDocument();
    expect(nutritionsNavigation).toBeInTheDocument();
  });
  test('should change ingridients button classname when clicked', () => {
    render(
      <MockDiscover />,
    );
    const ingridientsButton = screen.getByTestId('ingredients-navigation');
    expect(ingridientsButton).toHaveClass('nav-button');
    fireEvent.click(ingridientsButton);
    expect(ingridientsButton).toHaveClass('nav-button-red');
  });
  test('should change nutritions button classname when clicked', () => {
    render(
      <MockDiscover />,
    );
    const nutritionsButton = screen.getByTestId('nutritions-navigation');
    expect(nutritionsButton).toHaveClass('nav-button');
    fireEvent.click(nutritionsButton);
    expect(nutritionsButton).toHaveClass('nav-button-red');
  });
  test('should render ingridients component when ingridients button is clicked', () => {
    render(
      <MockDiscover />,
    );
    const ingridientsButton = screen.getByTestId('ingredients-navigation');
    fireEvent.click(ingridientsButton);
    const searchRecipesButton = screen.getByRole('button', { name: 'Search recipe' });
    expect(searchRecipesButton).toBeInTheDocument();
  });
  test('should render nutritions component when nutritions button is clicked', () => {
    render(
      <MockDiscover />,
    );
    const nutritionsButton = screen.getByTestId('nutritions-navigation');
    fireEvent.click(nutritionsButton);
    const searchRecipesButton = screen.getByLabelText('Max Carbs (between 10 and 100):');
    expect(searchRecipesButton).toBeInTheDocument();
  });
});
