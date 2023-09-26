import React from 'react';
import { IArtist } from '../../type';
import { Link } from 'react-router-dom';
import './ArtistItem.css';

interface Props {
  artist: IArtist
}
const ArtistItem: React.FC<Props> = ({artist}) => {
  const image = 'http://localhost:8000/' + artist.image;

  return (
    <Link to={`/albums/${artist._id}`} className="artist-link">
      <div className="artist-item">
        <div>
          <img src={image} alt={artist.title} className="artist-img"/>
        </div>
        <div className="artist-item-two">
          <span className="artist-span">Best Artist</span>
          <h2 className="artist-title">{artist.title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ArtistItem;