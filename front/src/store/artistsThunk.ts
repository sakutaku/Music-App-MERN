import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtist, IArtistMutation } from '../type';
import axiosApi from '../axiosApi';
import { RootState } from '../app/store';

export const fetchArtists = createAsyncThunk<IArtist[]>(
  'artists/fetch',
  async () => {
    const artistsResponse = await axiosApi.get<IArtist[]>('/artists');
    return artistsResponse.data;
    }
);

export const createArtists = createAsyncThunk<void, IArtistMutation, { state: RootState }>(
  'artists/create',
  async (data, thunkAPI) => {
    const formData = new FormData();
    const keys = Object.keys(data) as (keyof IArtistMutation)[];

    keys.forEach(key => {
      const value = data[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const usersState = thunkAPI.getState().users;
    const token = usersState.user?.token;
    await axiosApi.post('/artists', formData, {headers: {'Authorization': token}});
  }
);