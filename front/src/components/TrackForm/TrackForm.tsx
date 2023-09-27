import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { ITrackMutationPost } from '../../type';
import { createTrack } from '../../store/tracksThunk';
import { useSelector } from 'react-redux';
import { selectAlbumId } from '../../store/tracksSlice';

const TrackForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const albumId = useSelector(selectAlbumId);
  const [state, setState] = useState<ITrackMutationPost>({
    album: '',
    title: '',
    duration: '',
    number: '',
    link: ''
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const data = {
        album: albumId,
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

      <button type="submit" className="form-btn">Add</button>
    </form>

  );
};

export default TrackForm;