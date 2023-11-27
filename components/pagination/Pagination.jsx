const Pagination = ({ setPage, page, dataCount }) => {
  const totalPages = Math.ceil(dataCount / 6);
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={page <= 1}
        // onClick={() => router.push(`?page=${page - 1}`)}
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button
        disabled={page >= totalPages}
        className={styles.button}
        // onClick={() => router.push(`?page=${page + 1}`)}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
