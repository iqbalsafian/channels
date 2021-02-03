import logo from '../images/astro-logo.svg';
import './Header.scss';

const Header = () => {
  return (
    <div className="header-container">
      <img alt="Astro logo" src={logo} width="150" height="70" />
    </div>
  );
};

export default Header;
