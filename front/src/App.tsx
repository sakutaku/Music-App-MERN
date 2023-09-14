import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './containers/Main';
import Albums from './containers/Albums';
import Tracks from './containers/Tracks';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/albums/:id" element={<Albums/>}/>
        <Route path="/tracks/:id" element={<Tracks/>}/>
      </Routes>
    </>
  );
}

export default App;
