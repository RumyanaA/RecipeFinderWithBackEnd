import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import Home from './Home';
import { server } from '../../mocks/server';

beforeAll(() => {
  server.listen();
  const mockUser = { username: 'Anelia', password: '123' };
  window.localStorage.setItem('user', JSON.stringify(mockUser));
});

let history;

beforeEach(() => {
  server.resetHandlers();
  history = createBrowserHistory();
});

afterAll(() => server.close());

describe('Home Page', () => {
  test('should redirect to discover', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('discover'));

    expect(history.location.pathname).toEqual('/discover');
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should redirect to menu-planner', () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('menu-planner'));

    expect(history.location.pathname).toEqual('/menu-planner');
  });
});
