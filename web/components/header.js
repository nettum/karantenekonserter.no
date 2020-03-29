import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Karantenekonserter.no</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>Om</a>
    </Link>
  </div>
);

export default Header;
