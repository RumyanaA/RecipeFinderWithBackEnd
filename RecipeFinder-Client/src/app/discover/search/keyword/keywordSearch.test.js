/* eslint-disable no-unused-vars */
import React from 'react';
import { createBrowserHistory } from 'history';
import {
  render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import KeywordSearch from './KeywordSearch';
// import useApi from '../../../../__mocks__/useApi';

let history;

beforeEach(() => {
  history = createBrowserHistory();
  // jest.spyOn(window, 'fetch').mockImplementation(useApi);
});

function MockKeywordSearch() {
  return (
    <Router location={history.location} navigator={history}>
      <KeywordSearch />
    </Router>
  );
}
beforeAll(() => {
  const mockUser = { username: 'Anelia', password: '123' };
  window.localStorage.setItem('user', JSON.stringify(mockUser));
});

afterEach(() => {
  // jest.restoreAllMocks();
});

test('', () => {});

// test('should render one card', async () => {
//   render(
//     <MockKeywordSearch />,
//   );

//   const divEllement = await screen.findByTestId('searched-recipe-card-0');
//   expect(divEllement).toBeInTheDocument();
// });

// test('should render multiple cards', async () => {
//   render(
//     <MockKeywordSearch />,
//   );

//   const divEllements = screen.findAllByTestId(/searched-recipe-card-/i);
//   waitFor(() => expect(divEllements.length).toBe(4));
//   waitFor(() => screen.debug());
// });
