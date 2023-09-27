import React from 'react';
import { ITrack } from '../../type';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectUser } from '../../store/usersSlice';
import { createTrackHistory } from '../../store/trackHistoryThunk';
import { useNavigate } from 'react-router-dom';
import {addLink, turnYoutube} from "../../store/tracksSlice";
import { userRoles } from '../../constants';
import play from "../../assets/images/play.png";
import './TrackItem.css';
import { deleteTrack } from '../../store/tracksThunk';

interface Props {
  track: ITrack
}
const TrackItem: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const onPlayClick = async () => {
    if (!user) {
      alert('No user');
      navigate('/');
    } else {
      try {
        dispatch(createTrackHistory(track._id));
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
      if(window.confirm('Do you want to delete this track?')) {
        dispatch(deleteTrack(id));
        navigate('/');
      }
    } catch (e) {
      alert('Something is wrong!')
    }
  };

  if(user?.role === userRoles.admin) {
    return (
      <div className="track-item">
        <div>
          <h3 className="track-title">
            {track.title} № {track.number}
            <span className="track-delete-wrap">
              <button className="track-delete" onClick={() => onDeleteClick(track._id)}></button>
            </span>
          </h3>
          {
            !track.isPublished
              ?
              <div className="track-status-wrap">
                Unpublished
                <button className="track-status-btn">Publish</button>
              </div>
              :
              null
          }
        </div>
        <div className="track-info">
          {user ?
            <button className="play-btn" type="button" onClick={onPlayClick}>
              <img src={play} alt="play" className="track-play"/>
            </button>
            :
            null
          }
          <div className="line-one"></div>
          <div className="track-duration">
            <i>{track.duration} minutes</i>
          </div>
        </div>
      </div>
    );
  }

  if(track.isPublished) {
    return (
      <div className="track-item">
        <div>
          <h3 className="track-title">
            {track.title} № {track.number}
          </h3>
        </div>
        <div className="track-info">
          {user ?
            <button className="play-btn" type="button" onClick={onPlayClick}>
              <img src={play} alt="play" className="track-play"/>
            </button>
            :
            null
          }
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