import Link from 'next/link';

import styles from './header.module.css';

const Header = () => (
  <header className={styles.main}>
    <Link href="/">
      <a><h1>Karantenekonserter.no</h1></a>
    </Link>
    <Link href="/about">
      <a className={styles.about}>Om</a>
    </Link>
  </header>
);

export default Header;
