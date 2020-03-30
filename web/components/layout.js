import Header from './header';
import Footer from './footer';

import styles from './layout.module.css';

const Layout = props => (
  <div className={styles.main}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;
