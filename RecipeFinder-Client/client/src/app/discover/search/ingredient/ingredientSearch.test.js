/* eslint-disable no-unused-expressions */
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import IngridientSearch from './IngredientSearch';
import { server } from '../../../../mocks/server';

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

function MockIngridientSearch() {
  return (
    <Router location={history.location} navigator={history}>
      <IngridientSearch />
    </Router>
  );
}

const fetchIngridient = async (clickIngridient = true) => {
  const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
  fireEvent.change(inputEllement, { target: { value: 'a' } });
  const fetchedIngridient = await waitFor(() => screen.getByTestId('ingridient-testid-0'), { timeout: 1100 });
  clickIngridient && fireEvent.click(fetchedIngridient);
  return fetchedIngridient;
};

describe('Ingridients search tests', () => {
  test('should be able to type in input', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'banana' } });
    expect(inputEllement.value).toBe('banana');
  });

  test('should render "no ingridients found" when response from fetch is empty array', async () => {
    // server.use(
    //   rest.get('https://api.spoonacular.com/food/ingredients/search', (req, res, ctx) => {
    //     req.url.searchParams.get('ingridients');
    //     req.url.searchParams.get('apiKey');
    //     return res(
    //       ctx.status(200),
    //       ctx.json({ results: [] }),
    //     );
    //   }),
    // );
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'invalidIngridientName' } });
    const noDataMessage = await waitFor(() => screen.getByTestId('no-ingridients-found'), { timeout: 1100 });
    expect(noDataMessage).toBeInTheDocument();
  });

  test('should show spinner when changing input and hide spinner when ingridients are fetched', async () => {
    render(
      <MockIngridientSearch />,
    );
    const inputEllement = screen.getByPlaceholderText(/Search ingridients.../i);
    fireEvent.change(inputEllement, { target: { value: 'banana' } });
    const spinnerElement = screen.getByTestId('ingridients-spinner');
    expect(spinnerElement).toBeInTheDocument();
    await waitFor(() => screen.getByTestId('ingridient-testid-0'), { timeout: 1100 });
    expect(spinnerElement).not.toBeInTheDocument();
  });

  test('should fetch and render ingridients when value is typed in the input', async () => {
    render(
      <MockIngridientSearch />,
    );
    const fetchedIngridient = await fetchIngridient(false);
    expect(fetchedIngridient).toBeInTheDocument();
  });

  test('should display clicked ingridient in selected ingridients container and remove it when "remove"button is clicked', async () => {
    render(
      <MockIngridientSearch />,
    );
    const fetchedIngridient = await fetchIngridient();

    const selectedIngridient = screen.getByTestId('selectedIngridient-testid-0');
    expect(selectedIngridient).toHaveTextContent(fetchedIngridient.textContent);
    const ingridientRemoveElement = screen.getByTestId('div-X-testid-0');
    fireEvent.click(ingridientRemoveElement);
    expect(selectedIngridient).not.toBeInTheDocument();
  });

  test('should fetch and render 2 recipes after find recipes button is clicked', async () => {
    render(
      <MockIngridientSearch />,
    );
    await fetchIngridient();
    const searchRecipesButton = screen.getByRole('button');
    fireEvent.click(searchRecipesButton);
    const fetchedRecipes = await waitFor(() => screen.getAllByTestId(/recipe-testId-/i), { timeout: 1100 });
    expect(fetchedRecipes.length).toBe(2);
  });

  test('should show spinner while fetching recipes and hide when fetching has finished', async () => {
    render(
      <MockIngridientSearch />,
    );
    await fetchIngridient();
    const searchRecipesButton = screen.getByRole('button');
    fireEvent.click(searchRecipesButton);
    const spinnerElement = screen.getByTestId('recipes-spinner');
    expect(spinnerElement).toBeInTheDocument();
    await waitFor(() => screen.getAllByTestId(/recipe-testId-/i), { timeout: 1100 });
    expect(spinnerElement).not.toBeInTheDocument();
  });
});
