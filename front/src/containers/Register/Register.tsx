import React from 'react';
import Layout from '../Layout/Layout';
import './Register.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const Enter = () => {
  return (
    <>
      <Layout />
      <div className="container">
        <div className="register-page">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Enter;
