import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Spinner from '../components/Spinner/Spinner';
import TrackItem from '../components/TrackItem';
import { useAppDispatch } from '../app/hook';
import { fetchTrack } from '../store/tracksThunk';

const Tracks = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch()
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  const show = useSelector((state: RootState) => state.tracks.fetchLoading);
  const album = useSelector((state: RootState) => state.tracks.album);
  const artist = useSelector((state: RootState) => state.tracks.artist);


  useEffect(() => {
    dispatch(fetchTrack(id));
  }, [dispatch, id]);

  let items: React.ReactNode = <Spinner/>;

  if(!show) {
    items = tracks.map((track) => (
      <TrackItem track={track} key={track._id}/>
    ));
  }


  return (
    <div className="tracks">
      <div className="main">
        <section className="main-img"></section>
        <h1 className="main-title">Offering the Best Music to Listeners Worldwide</h1>
      </div>
      <div className="container">
        <div>
          <h2 className="track-artist">{artist}</h2>
          <h3 className="track-album">{album}</h3>
        </div>
        {items}
      </div>
    </div>
  );
};

export default Tracks;