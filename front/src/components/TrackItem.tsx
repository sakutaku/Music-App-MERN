import React from 'react';
import { ITrack } from '../type';
import play from "../assets/images/play.png";

interface Props {
  track: ITrack
}
const TrackItem: React.FC<Props> = ({track}) => {

  return (
    <div className="track-item">
      <div>
        <h3 className="track-title">
          {track.title} № {track.number}
        </h3>
      </div>
      <div className="track-info">
        <div>
          <img src={play} alt="play" className="track-play"/>
        </div>
        <div className="line-one"></div>
        <div>{track.duration} minutes</div>
      </div>
    </div>
  );
};

export default TrackItem;