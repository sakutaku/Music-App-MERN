import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hook';
import { fetchArtists } from '../store/artistsThunk';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ArtistItem from '../components/ArtistItem';
import Spinner from '../components/Spinner/Spinner';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useSelector((state: RootState) => state.artists.allArtists);
  const show = useSelector((state: RootState) => state.artists.fetchLoading);

  useEffect( () => {
    dispatch(fetchArtists());
  }, [dispatch]);

  let items: React.ReactNode = <Spinner/>;

  if(!show) {
    items = artists.map((artist) => (
      <ArtistItem
        key={artist.id}
        artist={artist}
      />
    ));
  }

  return (
    <div className="artists">
      {items}
    </div>
  );
};

export default Artists;