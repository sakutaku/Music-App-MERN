import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import Layout from '../Layout/Layout';
import './Login.css';

const Enter = () => {
  return (
    <>
      <Layout/>
      <div className="container">
        <div className="login-page">
          <LoginForm/>
        </div>
      </div>
    </>
  );
};

export default Enter;