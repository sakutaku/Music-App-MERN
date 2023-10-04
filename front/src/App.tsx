import React from 'react';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Main from './containers/Main/Main';
import Albums from './containers/Albums/Albums';
import Tracks from './containers/Tracks/Tracks';
import TrackHistory from './containers/TrackHistory/TrackHistory';
import AddArtist from './containers/AddArtist/AddArtist';
import AddAlbum from './containers/AddAlbum/AddAlbum';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import AddTrack from './containers/AddTrack/AddTrack';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/albums/:id" element={<Albums />} />
        <Route path="/tracks/:id" element={<Tracks />} />
        <Route path="/tracks-add" element={<AddTrack />} />
        <Route path="/track_history" element={<TrackHistory />} />
        <Route path="/artist-add" element={<AddArtist />} />
        <Route path="/albums-add" element={<AddAlbum />} />
      </Routes>
    </>
  );
};

export default App;
