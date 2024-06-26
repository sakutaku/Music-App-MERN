import React from 'react';
import { ITrack } from '../../type';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { createTrackHistory } from '../../store/trackHistoryThunk';
import { useNavigate } from 'react-router-dom';
import { addLink, turnYoutube } from '../../store/tracksSlice';
import { userRoles } from '../../constants';
import play from '../../assets/images/play.png';
import { changeStatusTrack, deleteTrack } from '../../store/tracksThunk';
import './TrackItem.css';

interface Props {
  track: ITrack;
}

const TrackItem: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const onPlayClick = async () => {
    if (!user) {
      alert('No user');
      navigate('/');
    } else {
      const data = {
        track: track._id,
      };
      try {
        dispatch(createTrackHistory(data));
        dispatch(turnYoutube());
        dispatch(addLink(track.link));
        alert('Track is added to the track history!');
      } catch (e) {
        alert('Something is wrong!');
      }
    }
  };

  const onDeleteClick = (id: string) => {
    try {
      if (window.confirm('Do you want to delete this track?')) {
        dispatch(deleteTrack(id));
        navigate('/');
      }
    } catch (e) {
      alert('Something is wrong!');
    }
  };

  const onChangeClick = (id: string) => {
    try {
      dispatch(changeStatusTrack(id));
      navigate('/');
    } catch (e) {
      alert('Something is wrong!');
    }
  };

  if (user?.role === userRoles.admin) {
    return (
      <div className="track-item">
        <div>
          <h3 className="track-title">
            {track.title} № {track.number}
            <span className="track-delete-wrap">
              <button className="track-delete" onClick={() => onDeleteClick(track._id)}></button>
            </span>
          </h3>
          {!track.isPublished ? (
            <div className="track-status-wrap">
              Unpublished
              <button className="track-status-btn" onClick={() => onChangeClick(track._id)}>
                Publish
              </button>
            </div>
          ) : null}
        </div>
        <div className="track-info">
          {user ? (
            <button className="play-btn" type="button" onClick={onPlayClick}>
              <img src={play} alt="play" className="track-play" />
            </button>
          ) : null}
          <div className="line-one"></div>
          <div className="track-duration">
            <i>{track.duration} minutes</i>
          </div>
        </div>
      </div>
    );
  }

  if (!track.isPublished && user?._id === track.user) {
    return (
      <div className="track-item">
        <div>
          <h3 className="track-title">
            {track.title} № {track.number}
          </h3>
          <div className="track-status-wrap">Unpublished</div>
        </div>
        <div className="track-info">
          {user ? (
            <button className="play-btn" type="button" onClick={onPlayClick}>
              <img src={play} alt="play" className="track-play" />
            </button>
          ) : null}
          <div className="line-one"></div>
          <div className="track-duration">
            <i>{track.duration} minutes</i>
          </div>
        </div>
      </div>
    );
  }

  if (track.isPublished) {
    return (
      <div className="track-item">
        <div>
          <h3 className="track-title">
            {track.title} № {track.number}
          </h3>
        </div>
        <div className="track-info">
          {user ? (
            <button className="play-btn" type="button" onClick={onPlayClick}>
              <img src={play} alt="play" className="track-play" />
            </button>
          ) : null}
          <div className="line-one"></div>
          <div className="track-duration">
            <i>{track.duration} minutes</i>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TrackItem;
