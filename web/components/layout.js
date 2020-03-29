import Header from './header';

import styles from './layout.module.css';

const Layout = props => (
  <div class={styles.main}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
