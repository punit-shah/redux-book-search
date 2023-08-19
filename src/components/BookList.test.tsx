import { render, screen } from '@testing-library/react';
import BookList from './BookList';

test(`given an array of books is passed in,
it should render each book's title and author`, () => {
  render(
    <BookList
      books={[
        {
          title: 'Book One',
          author: 'Author One',
          key: '1',
        },
        {
          title: 'Book Two',
          author: 'Author Two',
          key: '2',
        },
      ]}
      query="book"
    />
  );

  expect(screen.getByText('Book One')).toBeVisible();
  expect(screen.getByText('Author One')).toBeVisible();

  expect(screen.getByText('Book Two')).toBeVisible();
  expect(screen.getByText('Author Two')).toBeVisible();
});

test(`given the books array is empty,
it should render a message saying there are no results for the given query`, () => {
  render(<BookList books={[]} query="bork" />);

  expect(screen.getByText('No results for "bork"')).toBeVisible();
});
