import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './images/logo.png';
import './Nav.css';

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleClick = () => {
    navigate('/profile');
  };

  const handleClick2 = () => {
    navigate('/movie');
  };

  const handleClick3 = () => {
    navigate('/');
  };



  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav_black'}`}>
      <div className="nav_contents">
        <img
          onClick={handleClick2}
          className="nav_logo"
          src={logo}
          alt="logo"
        />
        <div className="nav_links">
          <h2
            onClick={handleClick2}
            className={location.pathname === '/movie' ? 'nav-link-active' : ''}
          >
            Movies
          </h2>
          <h2
            onClick={handleClick3}
            className={location.pathname === '/' ? 'nav-link-active' : ''}
          >
            TV
          </h2>
          <form>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
              />
              <button type="submit">
              🔍
              </button>
            </div>
          </form>
        </div>
        <img
          onClick={handleClick}
          className="nav_avatar"
          src="https://www.fit2work.com.au/assets/img/avatars/LoginIconAppl.png"
          alt="avatar"
        />
      </div>
    </div>
  );
}

export default Nav;
