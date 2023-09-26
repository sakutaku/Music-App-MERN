import React from 'react';
import Layout from '../Layout/Layout';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import './AddAlbum.css';
import AlbumForm from '../../components/AlbumForm/AlbumForm';

const AddAlbum = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <Layout/>
      <div className="container">
        <div className="add-album-page">
          {
            !user ? null :(<AlbumForm/>)
          }
        </div>
      </div>
    </>
  );
};

export default AddAlbum;