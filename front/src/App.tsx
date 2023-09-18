import React from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './containers/Main';
import Albums from './containers/Albums';
import Tracks from './containers/Tracks';
import Enter from './containers/Enter';
import TrackHistory from './containers/TrackHistory';

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Enter/>}/>
        <Route path="/artists" element={<Main/>}/>
        <Route path="/albums/:id" element={<Albums/>}/>
        <Route path="/tracks/:id" element={<Tracks/>}/>
        <Route path="/track_history" element={<TrackHistory/>}/>
      </Routes>
    </>
  );
}

export default App;
