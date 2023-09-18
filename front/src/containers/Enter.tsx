import React, {useEffect} from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {useAppDispatch} from "../app/hook";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {clearUser} from "../store/usersSlice";
import YouTube, {YouTubeProps} from "react-youtube";

const Enter = () => {
  // const dispatch = useAppDispatch();
  // const user = useSelector((state: RootState) => state.users.user);
  //
  //   useEffect(() => {
  //       if(user) {
  //           dispatch(clearUser());
  //       }
  //   }, [user, dispatch]);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const opts: YouTubeProps['opts'] = {
        height: '300',
        width: '200',
        playerVars: {
            // https: 'developers.google.com/youtube/player_parameters',
            autoplay: 0,
            origin: 'http://localhost:3000/'
        },
    };

    console.log(opts);
  return (
    <>
      <div className="enter">
        <section className="main-img"></section>
        <h1 className="main-title">Offering the Best Music to Listeners Worldwide</h1>
      </div>
      <div className="container">
        <div className="enter-page">
          <RegisterForm/>
          <LoginForm/>
            <div>
                <YouTube id='1' videoId='yrtWLyp5gLI' opts={opts}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default Enter;