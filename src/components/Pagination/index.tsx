import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = ({ currentPage, onChangePage}: {currentPage: number, onChangePage: (page: number) => void;}) => {
  return (
      <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(event => onChangePage(event.selected + 1))}
          pageRangeDisplayed={8}
          pageCount={3}
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
      />
  )
};
