import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import Layout from '../Layout/Layout';
import './Enter.css';

const Enter = () => {
  return (
    <>
      <Layout/>
      <div className="container">
        <div className="enter-page">
          <RegisterForm/>
          <LoginForm/>
        </div>
      </div>
    </>
  );
};

export default Enter;