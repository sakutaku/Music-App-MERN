import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtist, IArtistMutation } from '../type';
import axiosApi from '../axiosApi';

export const fetchArtists = createAsyncThunk<IArtist[]>('artists/fetch', async () => {
  const artistsResponse = await axiosApi.get<IArtist[]>('/artists');
  return artistsResponse.data;
});

export const createArtists = createAsyncThunk<void, IArtistMutation>(
  'artists/create',
  async (data) => {
    const formData = new FormData();
    const keys = Object.keys(data) as (keyof IArtistMutation)[];

    keys.forEach((key) => {
      const value = data[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData);
  },
);

export const deleteArtist = createAsyncThunk<void, string>('artists/delete', async (id) => {
  await axiosApi.delete('/artists/' + id);
});

export const changeStatus = createAsyncThunk<void, string>('artists/change', async (id) => {
  await axiosApi.patch('/artists/' + id + '/togglePublished');
});
