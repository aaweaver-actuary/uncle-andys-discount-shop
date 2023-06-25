import { Outlet, Link } from 'react-router-dom';
import './Navbar.styles.css';

let logoPath = './crown.svg';

const Navbar = () => {
  return (
    <>
      <div className={'navigation'}>
        <ul>
          <li>
            <Link className="logo-container" to="/">
              <img src={logoPath} alt="logo" className="logo" />
            </Link>
          </li>
          {/* <li className="nav-divider">|</li>{' '} */}
          <span className="nav-links-container">
            <li>
              <Link className="nav-link" to="/shop">
                SHOP
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/sign-in">
                SIGN IN
              </Link>
            </li>
          </span>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
