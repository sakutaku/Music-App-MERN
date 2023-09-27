import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import ArtistForm from '../../components/ArtistForm/ArtistForm';
import './AddArtist.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';

const AddArtist = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();


  useEffect(() => {
    if(!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Layout/>
      <div className="container">
        <div className="add-artist-page">
          <ArtistForm/>
        </div>
      </div>
    </>
  );
};

export default AddArtist;