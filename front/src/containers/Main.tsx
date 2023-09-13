import React from 'react';
import Artists from './Artists';

const Main = () => {
  return (
    <>
      <div className="main">
        <section className="main-img"></section>
        <h1 className="main-title">Offering the Best Music to Listeners Worldwide</h1>
      </div>
      <div className="container">
        <Artists/>
      </div>

    </>
  );
};

export default Main;