import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png";


const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to='/'>
          <img src={logo} alt="logo" className="logo"/>
        </Link>
      </div>
    </header>
  );
};

export default Header;