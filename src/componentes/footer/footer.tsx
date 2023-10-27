import styles from './footer.module.scss';
export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={`${styles.mainFooter} ${className}`}
      data-testid="footer"
    >
      <div className={styles.containerImg}>
        <img className={styles.imgFooter} src="/peltz.png" alt="" />
        <img className={styles.imgFooter} src="/tenaya.png" alt="" />
        <img className={styles.imgFooter} src="/truble.png" alt="" />
      </div>
    </footer>
  );
}
