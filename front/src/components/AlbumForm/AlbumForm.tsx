import React, { useState } from 'react';
import { IAlbumMutationPost } from '../../type';
import FileInput from '../FileInput/FileInput';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../../store/albumsThunk';
import { useSelector } from 'react-redux';
import { selectArtists } from '../../store/artistsSlice';
import { selectUser } from '../../store/usersSlice';

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useSelector(selectArtists);
  const [state, setState] = useState<IAlbumMutationPost>({
    user: '',
    artist: '',
    title: '',
    year: '',
    image: null
  });
  const user = useSelector(selectUser);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      if(user) {
        const data = {
          user: user._id,
          artist: state.artist,
          title: state.title,
          year: state.year,
          image: state.image
        }
        await dispatch(createAlbum(data)).unwrap();
        navigate('/');
      }

    } catch (e) {
      alert('Something is wrong!');
    } finally {
      setState(() => ({
        user: '',
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
            item.isPublished
              ?
              <option value={item._id} key={index}>{item.title}</option>
              :
              null
          ))}
        </select>
      </div>
      <>
        <FileInput onChange={filesInputChangeHandler} name="image" label="Image:"/>
      </>
      <button type="submit" className="form-btn">Add</button>
    </form>
  );
};

export default AlbumForm;