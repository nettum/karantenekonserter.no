import Header from './header';

import styles from './layout.module.css';

const Layout = props => (
  <div className={styles.main}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
