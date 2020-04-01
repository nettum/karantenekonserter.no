import styles from './footer.module.css';

import SanityLogo from './icons/sanity';
import NextLogo from './icons/next';
import ZeitLogo from './icons/zeit';

const Footer = () => (
  <footer className={styles.main}>
    <div className={styles.content}>
      <small>Laget med</small>
      <span>❤️</span>
      <span>🤘</span>
    </div>
    <div className={styles.content}>
      <a href="https://www.sanity.io/" rel="noopener"><SanityLogo /></a>,
      <a className={styles.next} href="https://zeit.co/solutions/nextjs" rel="noopener"><NextLogo /></a>
      <a href="https://zeit.co/home" rel="noopener"><ZeitLogo /></a>
    </div>
    <small>Siden bruker informasjonskapsler (ga) til statistikk</small>
  </footer>
);

export default Footer;
