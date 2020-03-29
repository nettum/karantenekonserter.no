import Link from 'next/link';

import styles from './header.module.css';

const Header = () => (
  <header>
    <Link href="/">
      <a className={styles.link}>Karantenekonserter.no</a>
    </Link>
    <Link href="/about">
      <a className={styles.link}>Om</a>
    </Link>
  </header>
);

export default Header;
