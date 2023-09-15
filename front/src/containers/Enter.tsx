import React from 'react';
import Artists from './Artists';
import RegisterForm from '../components/RegisterForm';

const Enter = () => {
  return (
    <>
      <div className="enter">
        <section className="main-img"></section>
        <h1 className="main-title">Offering the Best Music to Listeners Worldwide</h1>
      </div>
      <div className="container">
        <div className="enter-page">
          <RegisterForm/>
        </div>
      </div>
    </>
  );
};

export default Enter;