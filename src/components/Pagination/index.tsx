import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

// TODO - add interface
export const Pagination = (props: { currentPage: number, onChangePage: (arg0: number) => void; }) => {
  return (
      <ReactPaginate
          className={styles.root}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(event => props.onChangePage(event.selected + 1))}
          pageRangeDisplayed={8}
          pageCount={3}
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
      />
  )
};
