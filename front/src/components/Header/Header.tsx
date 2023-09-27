import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { logout } from '../../store/usersThunk';
import './Header.css';


const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if(window.confirm('Do you want to logout?')) {
      dispatch(logout());
      navigate('/');
    }
  };

  return (
    <header className="header">
      {user !== null ?
        <div className="header-inner">
          <Link to='/'>
            <img src={logo} alt="logo" className="logo"/>
          </Link>
          <Link to={'/track_history'} className="enter-link">Tracks History</Link>
          <div className="user-hello">
            <span>Hello, {user.username}!</span>
            <Link to="/artist-add" className="add-artist-link">Add artist</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

        </div>

        :
        <div className="header-inner">
          <Link to='/'>
            <img src={logo} alt="logo" className="logo"/>
          </Link>
          <div>
            <Link to='/login' className="enter-link login-link">Login</Link>
            <Link to="/register" className="enter-link">Register</Link>
          </div>
        </div>
      }
      <div>

      </div>
    </header>
  );
};

export default Header;