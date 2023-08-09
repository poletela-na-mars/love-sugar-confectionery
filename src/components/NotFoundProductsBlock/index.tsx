import styles from './NotFoundProductsBlock.module.scss';

export const NotFoundProductsBlock = () => {
  return (
      <div className={styles.root}>
        <h2>К сожалению, не нашлось подходящих изделий.</h2>
      </div>
  );
};
