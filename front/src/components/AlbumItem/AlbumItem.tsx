import React from 'react';
import { IAlbum } from '../../type';
import { Link } from 'react-router-dom';
import './AlbumItem.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import { apiUrl, userRoles } from '../../constants';

interface Props {
  album: IAlbum;
}
const AlbumItem: React.FC<Props> = ({album}) => {
  const user = useSelector(selectUser);

  const onDelete = () => {
    alert('h');
  }

  if(user?.role === userRoles.admin) {
    return (
      <div className="album-container">
        <div className="album-delete-wrap">
          {
            !album.isPublished
              ?
              <div className="album-status">
                Unpublished
                <button className="album-status-btn">Publish</button>
              </div>
              :
              null
          }
          <button className="album-delete" onClick={onDelete}>X</button>
        </div>

        <Link to={`/tracks/${album._id}`} className="album-link">
          <div className="album-wrap">
            <div>
              <img src={apiUrl + '/' + album.image} alt={album.title} className="album-img"/>
            </div>
            <div className="album-txt">
              <h3>
                {album.title}
              </h3>
              <h5 className="tracks-year">Year: {album.year}</h5>
              <h5 className="tracks-total">
                <i>Total tracks: {album.tracks}</i>
              </h5>
            </div>
          </div>
        </Link>
      </div>

    );
  }

  if(album.isPublished) {
    return (
      <Link to={`/tracks/${album._id}`} className="album-link">
        <div className="album-wrap">
          <div>
            <img src={'http://localhost:8000/' + album.image} alt={album.title} className="album-img"/>
          </div>
          <div className="album-txt">
            <h3>{album.title}</h3>
            <h5 className="tracks-year">Year: {album.year}</h5>
            <h5 className="tracks-total">
              <i>Total tracks: {album.tracks}</i>
            </h5>
          </div>
        </div>
      </Link>
    );
  } else {
    return null
  }
};

export default AlbumItem;