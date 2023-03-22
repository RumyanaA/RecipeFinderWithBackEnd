import React from 'react';
import { createBrowserHistory } from 'history';
import {
  fireEvent, render, screen, waitFor,
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
  test('renders Random food joke label', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>,

    );
    const linkElement = screen.getByTestId('random-food-joke-label');
    expect(linkElement).toHaveTextContent(
      'Random food joke:',
    );
  });
  test('renders Random food joke paragraph', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>,

    );
    await waitFor(() => screen.getByText('mocked food joke'));
    expect(screen.getByText('mocked food joke')).toBeInTheDocument();
  });

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
