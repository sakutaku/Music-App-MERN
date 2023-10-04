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
import AlbumItem from '../../components/AlbumItem/AlbumItem';

const Albums = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const album = useSelector(selectAlbums);
  const show = useSelector(selectFetchLoading);
  const artist = useSelector(selectAlbumArtist);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAlbum(id));
  }, [dispatch, id]);

  let items: React.ReactNode = <Spinner />;
  if (!show) {
    items = album.map((alb) => <AlbumItem album={alb} key={alb._id} />);
  }

  return (
    <>
      <Layout />
      <div className="container">
        <div className="album-header">
          <h2 className="artist-name">{artist}</h2>
          {user ? (
            <Link to="/albums-add" className="add-album-link">
              Add New Album
            </Link>
          ) : null}
        </div>
        <div className="albums-list">{items}</div>
      </div>
    </>
  );
};

export default Albums;
