import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import './AddAlbum.css';
import AlbumForm from '../../components/AlbumForm/AlbumForm';
import { useNavigate } from 'react-router-dom';

const AddAlbum = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <>
      <Layout />
      <div className="container">
        <div className="add-album-page">
          <AlbumForm />
        </div>
      </div>
    </>
  );
};

export default AddAlbum;
