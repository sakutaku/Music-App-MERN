import React from 'react';
import Artists from '../Artists/Artists';
import Layout from '../Layout/Layout';

const Main = () => {
  return (
    <>
      <Layout />
      <div className="container">
        <Artists />
      </div>
    </>
  );
};

export default Main;
