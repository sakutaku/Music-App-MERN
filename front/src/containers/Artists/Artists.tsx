import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hook';
import { fetchArtists } from '../../store/artistsThunk';
import { useSelector } from 'react-redux';
import ArtistItem from '../../components/ArtistItem/ArtistItem';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { selectUser } from '../../store/usersSlice';
import { selectArtists, selectFetchLoading } from '../../store/artistsSlice';
import './Artists.css';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useSelector(selectArtists);
  const show = useSelector(selectFetchLoading);
  const user = useSelector(selectUser);

  useEffect( () => {
    dispatch(fetchArtists());
  }, [dispatch]);

  let items: React.ReactNode = <Spinner/>;

  if(!show) {
    items = artists.map((artist) => (
      <ArtistItem
        key={artist._id}
        artist={artist}
      />
    ));
  }

  return (
    <div className="artists-page">
      {
        user
          ?
          <div className="artists-link">
            <Link to="/artist-add" className="add-artist-link">Add artist</Link>
          </div>
          :
          null
      }
      <div className="artists">
        {items}
      </div>
    </div>

  );
};

export default Artists;