import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <header>
    <Link href="/">
      <a style={linkStyle}>Karantenekonserter.no</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>Om</a>
    </Link>
  </header>
);

export default Header;
