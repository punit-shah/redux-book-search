import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import App from './App';
import openLibrarySearchMockHandler from './mocks/openLibrarySearch';
import { renderWithProviders } from './testUtils';

// setup mock server for Open Library Search API
const server = setupServer(openLibrarySearchMockHandler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('should render the book search', () => {
  renderWithProviders(<App />);

  expect(screen.getByLabelText('Search books')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Search' })).toBeVisible();
});

test(`when the user enters a search query,
it should show the first page of results and the expected pagination`, async () => {
  const { user } = renderWithProviders(<App />);

  await user.click(screen.getByLabelText('Search books'));
  await user.keyboard('book');
  await user.click(screen.getByRole('button', { name: 'Search' }));

  // page 1 results
  expect(screen.getByText('Book 1')).toBeVisible();
  expect(screen.getByText('Book 2')).toBeVisible();
  // page 1 pagination
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  expect(screen.getByText('1 / 3')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
});

test(`given the user is on the first page of results,
when the user clicks the "Next page" button,
it should show the second page of results and the expected pagination`, async () => {
  const { user } = renderWithProviders(<App />, {
    preloadedState: { bookSearch: { query: 'book', page: 1 } },
  });
  expect(await screen.findByText('1 / 3')).toBeVisible();

  await user.click(screen.getByRole('button', { name: 'Next page' }));

  // page 2 results
  expect(screen.getByText('Book 11')).toBeVisible();
  expect(screen.getByText('Book 12')).toBeVisible();
  // page 2 pagination
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled();
  expect(screen.getByText('2 / 3')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
});

test(`given the user is on the second page of results,
when the user clicks the "Previous page" button,
it should show the first page of results and the expected pagination`, async () => {
  const { user } = renderWithProviders(<App />, {
    preloadedState: { bookSearch: { query: 'book', page: 2 } },
  });
  expect(await screen.findByText('2 / 3')).toBeVisible();

  await user.click(screen.getByRole('button', { name: 'Previous page' }));

  // page 1 results
  expect(screen.getByText('Book 1')).toBeVisible();
  expect(screen.getByText('Book 2')).toBeVisible();
  // page 1 pagination
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  expect(screen.getByText('1 / 3')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
});

test(`given the user is on the second page of results,
when the user clicks the "Next page" button,
it should show the last page of results and the expected pagination`, async () => {
  const { user } = renderWithProviders(<App />, {
    preloadedState: { bookSearch: { query: 'book', page: 2 } },
  });
  expect(await screen.findByText('2 / 3')).toBeVisible();

  await user.click(screen.getByRole('button', { name: 'Next page' }));

  // page 3 results
  expect(screen.getByText('Book 21')).toBeVisible();
  expect(screen.getByText('Book 22')).toBeVisible();
  // page 3 pagination
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled();
  expect(screen.getByText('3 / 3')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
});

test(`given the user is on the last page of results,
when the user clicks on the "Previous page" button,
it should show the second page of results and the expected pagination`, async () => {
  const { user } = renderWithProviders(<App />, {
    preloadedState: { bookSearch: { query: 'book', page: 3 } },
  });
  expect(await screen.findByText('3 / 3')).toBeVisible();

  await user.click(screen.getByRole('button', { name: 'Previous page' }));

  // page 2 results
  expect(screen.getByText('Book 11')).toBeVisible();
  expect(screen.getByText('Book 12')).toBeVisible();
  // page 2 pagination
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled();
  expect(screen.getByText('2 / 3')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
});
