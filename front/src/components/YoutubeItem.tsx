import React from 'react';
import YouTube, {YouTubeProps} from "react-youtube";
import {useAppDispatch} from "../app/hook";
import {turnOffYoutube} from "../store/tracksSlice";

interface Props {
    link: string,
}
const YoutubeItem: React.FC<Props> = ({link}) => {
    const dispatch = useAppDispatch();
    const opts: YouTubeProps['opts'] = {
        height: '300',
        width: '400',
        playerVars: {
            autoplay: 0,
            controls: 0,
            autohide: 1,
            wmode: 'opaque',
            origin: 'http/' +  window.location.host
        },
    };

    console.log(opts);


    return (
        <div className="backdrop">
            <div className="modal">
                <div className="modal-btn" onClick={() => dispatch(turnOffYoutube())}>X</div>
                <div className="youtube-wrap">
                    <YouTube
                        id={link}
                        videoId={link}
                        opts={opts}
                    />
                </div>

            </div>
        </div>
    );
};

export default YoutubeItem;