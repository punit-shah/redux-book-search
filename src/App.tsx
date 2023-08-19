import './App.css';
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import Pagination from './components/Pagination';
import { useDispatch, useSelector } from './store';
import { useSearchBooksQuery } from './store/api';
import {
  nextPage,
  previousPage,
  search,
  selectPage,
  selectQuery,
} from './store/state';

export default function App() {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const page = useSelector(selectPage);
  const { data, isLoading, isError } = useSearchBooksQuery(
    { query, page },
    { skip: !query }
  );

  return (
    <main className="App">
      <BookSearch onSearch={(searchQuery) => dispatch(search(searchQuery))} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading results</p>}
      {data && (
        <>
          <BookList books={data.books} query={data.query} />

          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onPreviousPage={() => dispatch(previousPage())}
            onNextPage={() => dispatch(nextPage())}
          />
        </>
      )}
    </main>
  );
}
