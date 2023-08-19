import { rest } from 'msw';
import { OpenLibrarySearchDoc, OpenLibrarySearchResponse } from '../store/api';

/**
 * Mock handler for Open Library Search API
 * Returns 3 pages of results, each containing 10 books
 */

// generates an array of 10 book objects, numbered incrementally from the given start number
const getBooks = (start: number): OpenLibrarySearchDoc[] =>
  Array.from({ length: 10 }, (_, index) => index + start).map((bookNumber) => ({
    title: `Book ${bookNumber}`,
    author_name: [`Author ${bookNumber}`],
    key: `${bookNumber}`,
  }));

const pages: {
  [page: number]: OpenLibrarySearchDoc[];
} = {
  1: getBooks(1),
  2: getBooks(11),
  3: getBooks(21),
};

const openLibrarySearchMockHandler = rest.get(
  'https://openlibrary.org/search.json',
  (req, res, ctx) => {
    const q = req.url.searchParams.get('q');
    const page = req.url.searchParams.get('page');

    if (!q || !page) {
      return res(ctx.json({ docs: [], num_found: 0, start: 0, q: '' }));
    }

    const pageNumber = parseInt(page, 10);

    const data: OpenLibrarySearchResponse = {
      docs: pages[pageNumber],
      num_found: 29,
      start: 10 * pageNumber - 10,
      q,
    };

    return res(ctx.json(data));
  }
);

export default openLibrarySearchMockHandler;
