import { screen } from '@testing-library/react';
import { renderWithUser } from '../testUtils';
import BookSearch from './BookSearch';

const onSearch = vi.fn();

test(`given a search query has been entered,
when the search button is clicked,
it should call the onSearch callback with the search query`, async () => {
  const { user } = renderWithUser(<BookSearch onSearch={onSearch} />);
  await user.click(screen.getByLabelText('Search books'));
  await user.keyboard('harry potter');

  await user.click(screen.getByRole('button', { name: 'Search' }));

  expect(onSearch).toHaveBeenCalledTimes(1);
  expect(onSearch).toHaveBeenCalledWith('harry potter');
});

test(`given the user has not entered a search query,
when the search button is clicked,
it should not call the onSearch callback`, async () => {
  const { user } = renderWithUser(<BookSearch onSearch={onSearch} />);

  await user.click(screen.getByRole('button', { name: 'Search' }));

  expect(onSearch).not.toHaveBeenCalled();
});
