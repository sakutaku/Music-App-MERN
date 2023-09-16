import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import { useAppSelector } from '../app/hook';
import { selectUser } from '../store/usersSlice';


const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="header">
      {user !== null ?
          <Link to='/artists'>
            <img src={logo} alt="logo" className="logo"/>
          </Link>
        :
        <div className="header-inner">
          <Link to='/'>
            <img src={logo} alt="logo" className="logo"/>
          </Link>
          <Link to={'/'} className="enter-link">Enter</Link>
        </div>
      }
      <div>

      </div>
    </header>
  );
};

export default Header;