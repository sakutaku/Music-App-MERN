import React from 'react';
import { IAlbum } from '../../type';
import { Link, useNavigate } from 'react-router-dom';
import './AlbumItem.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import { apiUrl, userRoles } from '../../constants';
import { useAppDispatch } from '../../app/hook';
import { changeStatusAlbum, deleteAlbum } from '../../store/albumsThunk';

interface Props {
  album: IAlbum;
}
const AlbumItem: React.FC<Props> = ({album}) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const onDeleteClick = (id: string) => {
    try {
      if(window.confirm('Do you want to delete this album?')) {
        dispatch(deleteAlbum(id));
        navigate('/');
      }

    } catch (e) {
      alert('Something is wrong!')
    } finally {
      navigate('/');
    }
  };

  const onChangeClick = async (id: string) => {
    try {
      await dispatch(changeStatusAlbum(id));
      navigate('/');
    } catch (e) {
      alert('Something is wrong!');
    }
  };

  if(user?.role === userRoles.admin) {
    return (
      <div className="album-container">
        <div className="album-delete-wrap">
          {
            !album.isPublished
              ?
              <div className="album-status">
                Unpublished
                <button className="album-status-btn" onClick={() => onChangeClick(album._id)}>Publish</button>
              </div>
              :
              null
          }
          <button className="album-delete" onClick={() => onDeleteClick(album._id)}>X</button>
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