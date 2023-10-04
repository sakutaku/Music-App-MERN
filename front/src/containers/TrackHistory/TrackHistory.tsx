import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hook';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { fetchTrackHistory } from '../../store/trackHistoryThunk';
import TrackHistoryItem from '../../components/TrackHistoryItem/TrackHistoryItem';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/usersSlice';
import { selectFetchLoading, selectItems } from '../../store/trackHistorySlice';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const show = useSelector(selectFetchLoading);
  const tracks = useSelector(selectItems);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(fetchTrackHistory());
    } else {
      navigate('/');
    }
  }, [dispatch, user, navigate]);

  let items: React.ReactNode = <Spinner />;

  if (!show) {
    items = tracks.map((track) => <TrackHistoryItem track={track} key={track.datetime} />);
  }

  return (
    <>
      <Layout />
      <div className="container">
        <div className="track-histiry">
          <h2 className="trackHistory-title">Track History:</h2>
        </div>
        <ul className="timeline">{items}</ul>
      </div>
    </>
  );
};

export default TrackHistory;
