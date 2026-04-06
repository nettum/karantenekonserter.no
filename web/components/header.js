import Link from 'next/link';

import styles from './header.module.css';

const Header = () => (
  <header className={styles.main}>
    <Link href="/">
      <div className={styles.emoji}>
        <img src="/heart.png" alt="Hjerte emoji ❤️" />
        <img src="/horns.png" alt="Djevelhorn emoji 🤘" />
      </div>
      <h1>karantenekonserter.no</h1>
    </Link>
    <Link href="/about" className={styles.about}>Om</Link>
  </header>
);

export default Header;
