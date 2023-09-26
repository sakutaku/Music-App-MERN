import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAlbumMutation, IAlbumMutationPost } from '../type';
import axiosApi from '../axiosApi';
import { RootState } from '../app/store';

export const fetchAlbum = createAsyncThunk<IAlbumMutation, string>(
  'album/fetch',
  async (id) => {
    const albumsResponse = await axiosApi.get<IAlbumMutation>(`/albums?artist=${id}`);
    return albumsResponse.data;
  }
);

export const createAlbum = createAsyncThunk<void, IAlbumMutationPost, { state: RootState }>(
  'album/create',
  async (data, thunkAPI) => {
    const formData = new FormData();
    const keys = Object.keys(data) as (keyof IAlbumMutationPost)[];

    keys.forEach(key => {
      const value = data[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const usersState = thunkAPI.getState().users;
    const token = usersState.user?.token;
    await axiosApi.post('/albums', formData, {headers: {'Authorization': token}});
  }
);