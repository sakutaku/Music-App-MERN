import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import TrackForm from '../../components/TrackForm/TrackForm';
import './AddTrack.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import { useAppDispatch } from '../../app/hook';
import { fetchAlbums } from '../../store/albumsThunk';
import { selectAllAlbums } from '../../store/albumsSlice';

const AddTrack = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const allAlbums = useSelector(selectAllAlbums);

  useEffect(() => {
    if(!user) {
      navigate('/');
    }
    dispatch(fetchAlbums());

  }, [navigate, user, dispatch]);

  return (
    <>
      <Layout/>
      <div className="container">
        <div className="add-track-page">
          <TrackForm albums={allAlbums}/>
        </div>
      </div>
    </>
  );
};

export default AddTrack;