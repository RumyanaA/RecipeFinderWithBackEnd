import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();

  const username = JSON.parse(localStorage.getItem('user'))?.name;

  const altLogo = 'logo';

  const navigateHome = () => navigate('/home');

  const logout = () => {
    localStorage.setItem('user', null);
    navigate('/login');
  };
  return (
    <header
      data-testid="header"
      className="header-container"
    >
      <h1
        onClick={navigateHome}
        className="app-name"
      >
        {' '}
        <img
          className="logo"
          alt={altLogo.toString()}
          src="img/logo.jpg"
        />
        <span className="name">The Taste Council</span>
      </h1>
      <div className="username-logout-container">
        <h3 className="user-name">{username}</h3>
        <div onClick={logout}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size="xl"
            style={{
              width: '30px',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
