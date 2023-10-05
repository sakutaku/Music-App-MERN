import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Accordion = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Add:</button>
      <div className="dropdown-content">
        <Link to="/tracks-add" className="add-track">
          Track
        </Link>
        <Link to="/artist-add" className="add-track">
          Artist
        </Link>
        <Link to="/albums-add" className="add-track">
          Album
        </Link>
      </div>
    </div>
  );
};

export default Accordion;
