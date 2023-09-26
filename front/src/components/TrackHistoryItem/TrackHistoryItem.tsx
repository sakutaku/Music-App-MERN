import React from 'react';
import { ITrackHistory} from "../../type";
import dayjs from 'dayjs';
import './TrackHistoryItem.css';

interface Props {
    track: ITrackHistory
}
const TrackHistoryItem: React.FC<Props> = ({track}) => {
    const date = dayjs(track.datetime).format('DD.MM.YYYY HH:mm:ss');

    return (
        <li>
            <time dateTime={date}>{date}</time>
            <span className='trackHistory-artist'>{track.artist}</span>
            <span>{track.track}</span>
        </li>
    );
};

export default TrackHistoryItem;