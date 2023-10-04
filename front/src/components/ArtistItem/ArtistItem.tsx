import React from 'react';
import { IArtist } from '../../type';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import { apiUrl, userRoles } from '../../constants';
import { useAppDispatch } from '../../app/hook';
import { changeStatus, deleteArtist, fetchArtists } from '../../store/artistsThunk';
import './ArtistItem.css';

interface Props {
  artist: IArtist;
}

const ArtistItem: React.FC<Props> = ({ artist }) => {
  const dispatch = useAppDispatch();
  const image = apiUrl + '/' + artist.image;
  const user = useSelector(selectUser);

  const onDeleteClick = async (id: string) => {
    try {
      if (window.confirm('Do you want to delete this artist?')) {
        await dispatch(deleteArtist(id));
        await dispatch(fetchArtists());
      }
    } catch (e) {
      alert('Something is wrong!');
    }
  };

  const onChangeClick = async (id: string) => {
    try {
      dispatch(changeStatus(id));
      await dispatch(fetchArtists());
    } catch (e) {
      alert('Something is wrong!');
    }
  };

  if (user?.role === userRoles.admin) {
    return (
      <div className="artist-item">
        <div className="artist-header">
          {!artist.isPublished ? (
            <div className="artist-status-wrap">
              <h3 className="artist-status">Unpublished</h3>
              <button className="artist-status-btn" onClick={() => onChangeClick(artist._id)}>
                Publish
              </button>
            </div>
          ) : null}
          <button className="artist-delete" onClick={() => onDeleteClick(artist._id)}>
            X
          </button>
        </div>

        <Link to={`/albums/${artist._id}`} className="artist-link">
          <div>
            <div>
              <img src={image} alt={artist.title} className="artist-img" />
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

  if (artist.isPublished) {
    return (
      <Link to={`/albums/${artist._id}`} className="artist-link">
        <div className="artist-item">
          <div>
            <img src={image} alt={artist.title} className="artist-img" />
          </div>
          <div className="artist-item-two">
            <span className="artist-span">Best Artist</span>
            <h2 className="artist-title">{artist.title}</h2>
          </div>
        </div>
      </Link>
    );
  } else if (!artist.isPublished && artist.user === user?._id) {
    return (
      <div className="artist-item">
        <div className="artist-header">
          <div className="artist-status-wrap">
            <h3 className="artist-status">Unpublished</h3>
          </div>
        </div>
        <Link to={`/albums/${artist._id}`} className="artist-link">
          <div>
            <div>
              <img src={image} alt={artist.title} className="artist-img" />
            </div>
            <div className="artist-item-two">
              <span className="artist-span">Best Artist</span>
              <h2 className="artist-title">{artist.title}</h2>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export default ArtistItem;
