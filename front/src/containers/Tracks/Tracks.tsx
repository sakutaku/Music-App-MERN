import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import TrackItem from '../../components/TrackItem/TrackItem';
import { useAppDispatch } from '../../app/hook';
import { fetchTrack } from '../../store/tracksThunk';
import YoutubeItem from "../../components/YoutubeItem/YoutubeItem";
import Layout from '../Layout/Layout';
import './Tracks.css';
import { selectUser } from '../../store/usersSlice';
import {
  selectAlbum,
  selectArtist,
  selectFetchLoading, selectLink,
  selectShowYouTube,
  selectTracks
} from '../../store/tracksSlice';

const Tracks = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch()
  const tracks = useSelector(selectTracks);

  const show = useSelector(selectFetchLoading);
  const album = useSelector(selectAlbum);
  const artist = useSelector(selectArtist);
  const youTubeModal = useSelector(selectShowYouTube);
  const link = useSelector(selectLink);
  const user = useSelector(selectUser);


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
    <>
      <Layout/>
      <div className="container">
        <div>
          {
            youTubeModal ? <YoutubeItem link={link}/> : null
          }
          <h2 className="track-artist">{artist}</h2>
          {
            user
              ?
              <div className="tracks-header">
                <h3 className="track-album">{album}</h3>
                <Link to="/tracks-add" className="track-link">Add track</Link>
              </div>
              :
              <h3 className="track-album">{album}</h3>
          }
        </div>
        {items}
      </div>
    </>
  );
};

export default Tracks;