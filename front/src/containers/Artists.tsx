import React, { useEffect } from 'react';
import { useAppDispatch } from '../app/hook';
import { fetchArtists } from '../store/artistsThunk';

const Artists = () => {
  const dispatch = useAppDispatch();

  useEffect( () => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div className="artists">

    </div>
  );
};

export default Artists;