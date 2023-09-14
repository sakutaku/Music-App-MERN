import React from 'react';
import { useParams } from 'react-router-dom';

const Tracks = () => {
  const { id } = useParams() as {id: string};


  return (
    <div className="albums-container">
      <div className="main">
        <section className="main-img"></section>
        <h1 className="main-title">Offering the Best Music to Listeners Worldwide</h1>
      </div>
      <div className="container">
      </div>
    </div>
  );
};

export default Tracks;