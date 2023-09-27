import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { fetchAlbum } from '../../store/albumsThunk';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import Layout from '../Layout/Layout';
import './Albums.css';
import { selectUser } from '../../store/usersSlice';
import { selectAlbumArtist, selectAlbums, selectFetchLoading } from '../../store/albumsSlice';


const Albums = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const album = useSelector(selectAlbums);
  const show = useSelector(selectFetchLoading);
  const artist = useSelector(selectAlbumArtist);
  const user = useSelector(selectUser);

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
        <div className="album-header">
          <h2 className="artist-name">{artist}</h2>
          {user ? <Link to="/albums-add" className="add-album-link">Add New Album</Link> : null}
        </div>
        <div className="albums-list">
          {items}
        </div>
      </div>
    </div>
  );
};

export default Albums;