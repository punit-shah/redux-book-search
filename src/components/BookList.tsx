import { Book } from '../store/api';
import styles from './BookList.module.css';

export interface BookListProps {
  books: Book[];
  query: string;
}

export default function BookList({ books, query }: BookListProps) {
  if (books.length === 0) {
    return <p>No results for "{query}"</p>;
  }

  return (
    <ul className={styles.list}>
      {books.map((book) => (
        <li key={book.key} className={styles.book}>
          <p className={styles.title}>{book.title}</p>
          <p className={styles.author}>{book.author}</p>
        </li>
      ))}
    </ul>
  );
}
