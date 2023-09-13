import React from 'react';
import { IArtist } from '../type';

interface Props {
  artist: IArtist
}
const ArtistItem: React.FC<Props> = ({artist}) => {
  console.log(artist.image);

  const image = 'http://localhost:8000/' + artist.image;

  console.log(image);

  return (
    <div className="artist-item">
      <div>
        <img src={image} alt={artist.id} className="artist-img"/>
      </div>
      <div className="artist-item-two">
        <span className="artist-span">Best Artist</span>
        <h2 className="artist-title">{artist.title}</h2>
      </div>
    </div>
  );
};

export default ArtistItem;