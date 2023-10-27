import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import styles from './PageTemplate.module.scss';

function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className={styles.header} />
      <main className={styles.mainContainer}>{children}</main>
      <Footer className={styles.footer} />
    </>
  );
}

export default PageTemplate;
