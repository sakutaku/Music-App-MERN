import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { fetchAlbum } from '../../store/albumsThunk';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Spinner from '../../components/Spinner/Spinner';
import Layout from '../Layout/Layout';
import './Albums.css';


const Albums = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const album = useSelector((state: RootState) => state.albums.albums);
  const show = useSelector((state: RootState) => state.artists.fetchLoading);
  const artist = useSelector((state: RootState) => state.albums.artist);

  useEffect(() => {
    dispatch(fetchAlbum(id));
  }, [dispatch, id]);

  let items: React.ReactNode = <Spinner/>;

  if(!show) {
    items = album.map((alb) => (
      <Link to={`/tracks/${alb._id}`} className="album-link">
        <div className="album-wrap">
          <div>
            <img src={'http://localhost:8000/' + alb.image} alt={alb.image} className="album-img"/>
          </div>
          <div className="album-txt">
            <h3>{alb.title}</h3>
            <h5 className="tracks-year">Year: {alb.year}</h5>
            <h5 className="tracks-total">
              <i>Total tracks: {alb.tracks}</i>
            </h5>
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <div className="albums-container">
      <Layout/>
      <div className="container">
        <div>
          <h2 className="artist-name">{artist}</h2>
        </div>
        <div className="albums-list">
          {items}
        </div>
      </div>
    </div>
  );
};

export default Albums;