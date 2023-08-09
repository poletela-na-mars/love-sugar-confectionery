import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
      <div className={styles.root}>
        <h1>Ничего не найдено</h1>
        <p>Проверьте правильность введенного адреса.</p>
      </div>
  );
};
