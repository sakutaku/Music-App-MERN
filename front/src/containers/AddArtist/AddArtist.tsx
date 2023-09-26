import React from 'react';
import Layout from '../Layout/Layout';
import ArtistForm from '../../components/ArtistForm/ArtistForm';
import './AddArtist.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';

const AddArtist = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <Layout/>
      <div className="container">
        <div className="add-artist-page">
          {
            !user ? null :(<ArtistForm/>)
          }
        </div>
      </div>
    </>
  );
};

export default AddArtist;