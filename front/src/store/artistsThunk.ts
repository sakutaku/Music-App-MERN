import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArtist } from '../type';
import axiosApi from '../axiosApi';

export const fetchArtists = createAsyncThunk<IArtist[]>(
  'artists/fetch',
  async () => {
    const artistsResponse = await axiosApi.get<IArtist[]>('/artists');
    return artistsResponse.data;
    }
);