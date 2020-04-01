import Link from 'next/link';

import styles from './header.module.css';

const Header = () => (
  <header className={styles.main}>
    <Link href="/">
      <a>
        <div className={styles.emoji}>
          <img src="/heart.png" alt="Hjerte emoji ❤️" />
          <img src="/horns.png" alt="Djevelhorn emoji 🤘" />
        </div>
        <h1>karantenekonserter.no</h1>
      </a>
    </Link>
    <Link href="/about">
      <a className={styles.about}>Om</a>
    </Link>
  </header>
);

export default Header;
