import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { logout } from '../../store/usersThunk';
import './Header.css';
import { apiUrl } from '../../constants';
import Accordion from './Accordion';

const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let img = '';

  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      dispatch(logout());
      navigate('/');
    }
  };

  if (user?.googleID) {
    img = user.avatar;
  } else {
    img = apiUrl + '/' + user?.avatar;
  }

  return (
    <header className="header">
      {user !== null ? (
        <div className="header-inner">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Link to={'/track_history'} className="enter-link">
            Tracks History
          </Link>
          <div className="user-hello">
            <span>Hello, {user.displayName}!</span>
            <span>
              <img src={img} alt="avatar" className="header-avatar" />
            </span>
            <div>
              <>
                <div>
                  <Accordion />
                </div>
              </>
            </div>
            <div>
              <button className="logout-btn" onClick={handleLogout}></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-inner">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <div>
            <Link to="/login" className="enter-link login-link">
              Login
            </Link>
            <Link to="/register" className="enter-link">
              Register
            </Link>
          </div>
        </div>
      )}
      <div></div>
    </header>
  );
};

export default Header;
