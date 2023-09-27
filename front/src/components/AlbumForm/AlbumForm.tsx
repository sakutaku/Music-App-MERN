import React, { useState } from 'react';
import { IAlbumMutationPost } from '../../type';
import FileInput from '../FileInput/FileInput';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../../store/albumsThunk';
import { useSelector } from 'react-redux';
import { selectArtistId } from '../../store/albumsSlice';

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artistId = useSelector(selectArtistId);
  const [state, setState] = useState<IAlbumMutationPost>({
    artist: '',
    title: '',
    year: '',
    image: null
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.image && !state.title && !state.artist) {
      alert('Fill the form!');
      return;
    }
    try {
      const data = {
        artist: artistId,
        title: state.title,
        year: state.year,
        image: state.image
      }
      await dispatch(createAlbum(data)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Something is wrong!');
    } finally {
      setState(() => ({
        artist: '',
        title: '',
        year: '',
        image: null
      }));
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <h2 className="form-title">Add new album</h2>
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
        <label htmlFor="year" className="form-label">Year</label>
        <input
          type="text"
          className='form-control'
          name="year"
          id="year"
          value={state.year}
          onChange={inputChangeHandler}
        />
      </div>
      <>
        <FileInput onChange={filesInputChangeHandler} name="image" label="Image:"/>
      </>
      <button type="submit" className="form-btn">Add</button>
    </form>
  );
};

export default AlbumForm;