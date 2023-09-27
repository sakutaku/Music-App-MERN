import React, { useState } from 'react';
import { IArtistMutation } from '../../type';
import FileInput from '../FileInput/FileInput';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { createArtists } from '../../store/artistsThunk';

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<IArtistMutation>({
    title: '',
    description: '',
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

    if (!state.image && !state.title) {
      alert('Fill the form!');
      return;
    }
    try {
      await dispatch(createArtists(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Something is wrong!');
    } finally {
      setState(() => ({
        title: '',
        description: '',
        image: null
      }));
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <h2 className="form-title">Add new artist</h2>
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
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          value={state.description}
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

export default ArtistForm;