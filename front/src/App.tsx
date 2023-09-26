import React from 'react';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './containers/Main/Main';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import Enter from './containers/Enter/Enter';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import AddArtist from './containers/AddArtist/AddArtist';

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
        <Route path="/add-artist" element={<AddArtist/>}/>
      </Routes>
    </>
  );
}

export default App;
