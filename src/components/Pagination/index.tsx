import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = (props: { onChangePage: (arg0: number) => void; }) => {
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
      />
  )
};
