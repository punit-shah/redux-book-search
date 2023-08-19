import { render, screen } from '@testing-library/react';
import { renderWithUser } from '../testUtils';
import Pagination from './Pagination';

const onNextPage = vi.fn();
const onPreviousPage = vi.fn();

describe('given there is only one page', () => {
  const totalPages = 1;

  it('should not render', () => {
    const { container } = render(
      <Pagination
        page={1}
        totalPages={totalPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});

describe('given there are multiple pages', () => {
  const totalPages = 3;

  describe('and the user is on the first page', () => {
    const page = 1;

    it('should render the page number and the total number of pages', () => {
      render(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );

      expect(screen.getByText('1 / 3')).toBeVisible();
    });

    it('should render the "Previous page" and "Next page" buttons', () => {
      render(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );

      expect(
        screen.getByRole('button', { name: 'Previous page' })
      ).toBeVisible();
      expect(screen.getByRole('button', { name: 'Next page' })).toBeVisible();
    });

    test(`when the "Previous page" button is clicked,
    it should not call the onPreviousPage callback`, async () => {
      const { user } = renderWithUser(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );
      const previousPageButton = screen.getByRole('button', {
        name: 'Previous page',
      });
      expect(previousPageButton).toBeDisabled();

      await user.click(previousPageButton);

      expect(onPreviousPage).not.toHaveBeenCalled();
    });

    test(`when the "Next page" button is clicked,
    it should call the onNextPage callback`, async () => {
      const { user } = renderWithUser(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );
      const nextPageButton = screen.getByRole('button', {
        name: 'Next page',
      });
      expect(nextPageButton).toBeEnabled();

      await user.click(nextPageButton);

      expect(onNextPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('and it is the last page', () => {
    const page = 3;

    it('should render the page number and the total number of pages', () => {
      render(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );

      expect(screen.getByText('3 / 3')).toBeVisible();
    });

    it('should render the "Previous page" and "Next page" buttons', () => {
      render(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );

      expect(
        screen.getByRole('button', { name: 'Previous page' })
      ).toBeVisible();
      expect(screen.getByRole('button', { name: 'Next page' })).toBeVisible();
    });

    test(`when the "Previous page" button is clicked,
    it should call the onPreviousPage callback`, async () => {
      const { user } = renderWithUser(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );
      const previousPageButton = screen.getByRole('button', {
        name: 'Previous page',
      });
      expect(previousPageButton).toBeEnabled();

      await user.click(previousPageButton);

      expect(onPreviousPage).toHaveBeenCalledTimes(1);
    });

    test(`when the "Next page" button is clicked,
    it should not call the onNextPage callback`, async () => {
      const { user } = renderWithUser(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );
      const nextPageButton = screen.getByRole('button', { name: 'Next page' });
      expect(nextPageButton).toBeDisabled();

      await user.click(nextPageButton);

      expect(onNextPage).not.toHaveBeenCalled();
    });
  });

  describe('and it is not the first or last page', () => {
    const page = 2;

    it('should render the page number and the total number of pages', () => {
      render(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );

      expect(screen.getByText('2 / 3')).toBeVisible();
    });

    it('should render the "Previous page" and "Next page" buttons', () => {
      render(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );

      expect(
        screen.getByRole('button', { name: 'Previous page' })
      ).toBeVisible();
      expect(screen.getByRole('button', { name: 'Next page' })).toBeVisible();
    });

    test(`when the "Previous page" button is clicked,
    it should call the onPreviousPage callback`, async () => {
      const { user } = renderWithUser(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );
      const previousPageButton = screen.getByRole('button', {
        name: 'Previous page',
      });
      expect(previousPageButton).toBeEnabled();

      await user.click(previousPageButton);

      expect(onPreviousPage).toHaveBeenCalledTimes(1);
    });

    test(`when the "Next page" button is clicked,
    it should call the onNextPage callback`, async () => {
      const { user } = renderWithUser(
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      );
      const nextPageButton = screen.getByRole('button', {
        name: 'Next page',
      });
      expect(nextPageButton).toBeEnabled();

      await user.click(nextPageButton);

      expect(onNextPage).toHaveBeenCalledTimes(1);
    });
  });
});
