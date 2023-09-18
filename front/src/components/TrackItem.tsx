import React from 'react';
import { ITrack } from '../type';
import play from "../assets/images/play.png";
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectUser } from '../store/usersSlice';
import { createTrackHistory } from '../store/trackHistoryThunk';
import { useNavigate } from 'react-router-dom';

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
      const data = {
        token: user.token,
        info: {
          track: track._id,
        }
      }
      try {
        dispatch(createTrackHistory(data));
        alert('Track is added to the track history!');
      } catch (e) {
        alert('Something is wrong!');
      }
    }
  };

  return (
    <div className="track-item">
      <div>
        <h3 className="track-title">
          {track.title} № {track.number}
        </h3>
      </div>
      <div className="track-info">
        <button className="play-btn" type="button" onClick={onPlayClick}>
          <img src={play} alt="play" className="track-play"/>
        </button>
        <div className="line-one"></div>
        <div className="track-duration">
          <i>{track.duration} minutes</i>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;