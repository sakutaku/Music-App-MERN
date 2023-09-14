import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/hook';
import { fetchAlbum } from '../store/albumsThunk';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Spinner from '../components/Spinner/Spinner';


const Albums = () => {
  const { id } = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const album = useSelector((state: RootState) => state.albums.album);
  const artists = useSelector((state: RootState) => state.artists.allArtists);
  const show = useSelector((state: RootState) => state.artists.fetchLoading);

  let artist: string = '';

  artists.forEach((art) => {
    if(art._id === id) {
      artist = art.title
    }
  });

  useEffect(() => {
    dispatch(fetchAlbum(id));
  }, [dispatch, id]);

  let items: React.ReactNode = <Spinner/>;

  if(!show) {
    items = album.map((alb) => (
      <Link to='/' className="album-link">
        <div className="album-wrap">
          <div>
            <img src={'http://localhost:8000/' + alb.image} alt={alb.image} className="album-img"/>
          </div>
          <div className="album-txt">
            <h3>{alb.title}</h3>
            <h5>Year: {alb.year}</h5>
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <div className="albums-container">
      <div className="main">
        <section className="main-img"></section>
        <h1 className="main-title">Offering the Best Music to Listeners Worldwide</h1>
      </div>
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