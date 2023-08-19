import styles from './Pagination.module.css';

export default function Pagination({
  page,
  totalPages,
  onNextPage,
  onPreviousPage,
}: {
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={`${styles.button} ${styles.previous}`}
        onClick={onPreviousPage}
        disabled={isFirstPage}
      >
        <span>Previous page</span>
      </button>
      {page} / {totalPages}
      <button
        type="button"
        className={`${styles.button} ${styles.next}`}
        onClick={onNextPage}
        disabled={isLastPage}
      >
        <span>Next page</span>
      </button>
    </div>
  );
}
