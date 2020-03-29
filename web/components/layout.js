import Header from './header';

import styles from './layout.module.css';

const Layout = props => (
  <div class={styles.layout}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
