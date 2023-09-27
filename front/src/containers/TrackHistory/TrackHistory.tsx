import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hook';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Spinner from '../../components/Spinner/Spinner';
import {fetchTrackHistory} from '../../store/trackHistoryThunk';
import TrackHistoryItem from "../../components/TrackHistoryItem/TrackHistoryItem";
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const show = useSelector((state: RootState) => state.trackHistory.fetchLoading);
  const tracks = useSelector((state: RootState) => state.trackHistory.items);
  const navigate = useNavigate();

  useEffect( () => {
    if(user) {
      dispatch(fetchTrackHistory(user.token));
    } else {
      navigate('/');
    }
  }, [dispatch, user, navigate]);

  let items: React.ReactNode = <Spinner/>;

  if(!show) {
    items = tracks.map((track) => (
     <TrackHistoryItem track={track} key={track.id}/>
    ));
  }

  return (
    <>
      <Layout/>
      <div className="container">
        <div className="track-histiry">
          <h2 className="trackHistory-title">Track History:</h2>
        </div>
        <ul className="timeline">
          {items}
        </ul>
      </div>
    </>
  );
};

export default TrackHistory;