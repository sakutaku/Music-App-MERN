import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { IAllAlbums, ITrackMutationPost, ITrackMutationPostTwo } from '../../type';
import { createTrack } from '../../store/tracksThunk';
import { useSelector } from 'react-redux';
import { selectArtists } from '../../store/artistsSlice';
import { fetchArtists } from '../../store/artistsThunk';

interface Props {
  albums: IAllAlbums[]
}
const TrackForm: React.FC<Props>= ({albums}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useSelector(selectArtists);
  const [state, setState] = useState<ITrackMutationPostTwo>({
    album: '',
    artist: '',
    title: '',
    duration: '',
    number: '',
    link: ''
  });

  useEffect( () => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const arr: IAllAlbums[] = [];

  albums.filter((alb) => {
    if(alb.artist === state.artist) {
      arr.push(alb);
    }
  })

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title && !state.number) {
      alert('Fill the form!');
      return;
    }
    try {
      const data: ITrackMutationPost = {
        album: state.album,
        title: state.title,
        duration: state.duration,
        number: state.number,
        link: state.link
      };

      await dispatch(createTrack(data)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Something is wrong!');
    } finally {
        setState(() => ({
          artist: '',
          album: '',
          title: '',
          duration: '',
          number: '',
          link: ''
        }));
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <h2 className="form-title">Add new Track</h2>
      <div className="input-wrap">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className='form-control'
          name="title"
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="input-wrap">
        <label htmlFor="duration" className="form-label">Duration</label>
        <input
          type="text"
          className='form-control'
          name="duration"
          id="duration"
          value={state.duration}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="input-wrap">
        <label htmlFor="number" className="form-label">Track №</label>
        <input
          type="text"
          className='form-control'
          name="number"
          id="number"
          value={state.number}
          onChange={inputChangeHandler}
        />
      </div>

      <div className="input-wrap">
        <label htmlFor="link" className="form-label">YouTube link</label>
        <input
          type="text"
          className='form-control'
          name="link"
          id="link"
          value={state.link}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="input-wrap">
        <label htmlFor="artist" className="form-label">Artist</label>
        <select value={state.artist}
                required
                onChange={inputChangeHandler}
                name="artist"
                id="artist"
                className="form-control">
          <option value="" disabled defaultValue="">Select artist</option>
          {artists.map((item, index) => (
            <option value={item._id} key={index}>{item.title}</option>
          ))}
        </select>
      </div>
      <div className="input-wrap">
        <label htmlFor="album" className="form-label">Album</label>
        <select value={state.album}
                required
                onChange={inputChangeHandler}
                name="album"
                id="album"
                className="form-control">
          <option value="" disabled defaultValue="">Select album</option>
          {arr.map((item, index) => (
            <option value={item._id} key={index}>{item.title}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="form-btn">Add</button>
    </form>

  );
};

export default TrackForm;