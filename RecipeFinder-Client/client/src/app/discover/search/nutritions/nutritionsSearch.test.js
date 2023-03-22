import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent,
  render,
  waitFor,
  screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { server } from '../../../../mocks/server';
import NutritionsSearch from './NutritionsSearch';

let history;
beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  history = createBrowserHistory();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

function MockNutritionsSearch() {
  return (
    <Router location={history.location} navigator={history}>
      <NutritionsSearch />
    </Router>
  );
}

describe('Nutritions search tests', () => {
  test('should render a button', () => {
    render(
      <MockNutritionsSearch />,
    );

    const searchRecipesButton = screen.getByRole('button', { name: /Search Recipes/i });
    expect(searchRecipesButton).toBeInTheDocument();
  });

  test('should be able to change carbs', () => {
    render(
      <MockNutritionsSearch />,
    );

    const slider = screen.getByLabelText('Max Carbs (between 10 and 100):');
    expect(slider).toHaveValue('55');
    fireEvent.change(slider, { target: { value: '90' } });
    expect(slider).toHaveValue('90');
  });

  test('should be able to change protein', () => {
    render(
      <MockNutritionsSearch />,
    );

    const slider = screen.getByLabelText('Max Protein (between 10 and 100):');
    expect(slider).toHaveValue('55');
    fireEvent.change(slider, { target: { value: '40' } });
    expect(slider).toHaveValue('40');
  });
  test('should be able to change calories', () => {
    render(
      <MockNutritionsSearch />,
    );

    const slider = screen.getByLabelText('Max Calories (between 50 and 800):');
    expect(slider).toHaveValue('400');
    fireEvent.change(slider, { target: { value: '500' } });
    expect(slider).toHaveValue('500');
  });

  test('should be able to change fat', () => {
    render(
      <MockNutritionsSearch />,
    );

    const slider = screen.getByLabelText('Max Fat (between 1 and 100):');
    expect(slider).toHaveValue('50');
    fireEvent.change(slider, { target: { value: '5' } });
    expect(slider).toHaveValue('5');
  });

  test('should fetch and render recipes when button is clicked', async () => {
    render(
      <MockNutritionsSearch />,
    );

    const button = screen.getByRole('button', { name: /Search Recipes/i });
    fireEvent.click(button);
    await waitFor(() => screen.getAllByTestId(/recipe-card-testid-/i));
    expect(screen.getAllByTestId(/recipe-card-testid-/i).length).toBe(3);
  });
});
