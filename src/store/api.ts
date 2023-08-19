import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OPEN_LIBRARY_SEARCH__API_BASE = 'https://openlibrary.org';
const OPEN_LIBRARY_SEARCH__PAGE_SIZE = 10;
const OPEN_LIBRARY_SEARCH__FIELDS = 'title,author_name,key';
const OPEN_LIBRARY_SEARCH__SORT = 'new';

export type OpenLibrarySearchDoc = {
  title: string;
  author_name: string[];
  key: string;
};

export type OpenLibrarySearchResponse = {
  docs: OpenLibrarySearchDoc[];
  num_found: number;
  start: number;
  q: string;
};

export type Book = {
  title: string;
  author: string;
  key: string;
};

export type SearchBooksResponse = {
  books: Book[];
  query: string;
  page: number;
  totalPages: number;
};

const bookSearchApi = createApi({
  reducerPath: 'bookSearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: OPEN_LIBRARY_SEARCH__API_BASE }),

  endpoints: (builder) => ({
    searchBooks: builder.query<
      SearchBooksResponse,
      { query: string; page: number }
    >({
      query: ({ query, page }) => ({
        url: 'search.json',
        params: {
          limit: OPEN_LIBRARY_SEARCH__PAGE_SIZE,
          fields: OPEN_LIBRARY_SEARCH__FIELDS,
          sort: OPEN_LIBRARY_SEARCH__SORT,
          q: query,
          page,
        },
      }),

      transformResponse: (data: OpenLibrarySearchResponse) => ({
        books: data.docs.map(({ title, author_name, key }) => ({
          title,
          key,
          author: author_name?.join(', ') ?? '',
        })),
        page: Math.floor(data.start / OPEN_LIBRARY_SEARCH__PAGE_SIZE) + 1,
        totalPages:
          Math.floor(data.num_found / OPEN_LIBRARY_SEARCH__PAGE_SIZE) + 1,
        query: data.q,
      }),
    }),
  }),
});
export default bookSearchApi;

export const { useSearchBooksQuery, useLazySearchBooksQuery } = bookSearchApi;
