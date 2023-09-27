import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import TrackForm from '../../components/TrackForm/TrackForm';
import './AddTrack.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';

const AddTrack = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if(!user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <>
      <Layout/>
      <div className="container">
        <div className="add-track-page">
          <TrackForm/>
        </div>
      </div>
    </>
  );
};

export default AddTrack;