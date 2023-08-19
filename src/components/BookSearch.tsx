import { useState } from 'react';
import styles from './BookSearch.module.css';

export interface BookSearchProps {
  onSearch: (searchQuery: string) => void;
}

export default function BookSearch({ onSearch }: BookSearchProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (inputValue) {
          onSearch(inputValue);
        }
      }}
    >
      <div className={styles.row}>
        <input
          id="bookSearch"
          aria-label="Search books"
          className={`${styles.input} ${styles.searchbox}`}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          required
          placeholder="Search books..."
        />
        <button type="submit" className={`${styles.input} ${styles.button}`}>
          Search
        </button>
      </div>
    </form>
  );
}
