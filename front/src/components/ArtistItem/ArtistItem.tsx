import React from 'react';
import { IArtist } from '../../type';
import { Link } from 'react-router-dom';
import './ArtistItem.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import { apiUrl, userRoles } from '../../constants';

interface Props {
  artist: IArtist
}
const ArtistItem: React.FC<Props> = ({artist}) => {
  const image = apiUrl + '/' + artist.image;
  const user = useSelector(selectUser);

  if(user?.role === userRoles.admin) {
    return (
      <div className="artist-item">
        <div className="artist-header">
          {
            !artist.isPublished
              ?
              <div className="artist-status-wrap">
                <h3 className="artist-status">Unpublished</h3>
                <button className="artist-status-btn">Publish</button>
              </div>
              :
              null
          }
          <button className="artist-delete">X</button>
        </div>

        <Link to={`/albums/${artist._id}`} className="artist-link">
          <div>
            <div>
              <img src={image} alt={artist.title} className="artist-img"/>
            </div>
            <div className="artist-item-two">
              <span className="artist-span">Best Artist</span>
              <h2 className="artist-title">{artist.title}</h2>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if(artist.isPublished) {
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
  } else {
    return null;
  }


};

export default ArtistItem;