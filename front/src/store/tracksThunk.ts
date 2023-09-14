import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrack } from '../type';
import axiosApi from '../axiosApi';

export const fetchTrack = createAsyncThunk<ITrack[], string>(
  'track/fetch',
  async (id) => {
    const tracksResponse = await axiosApi.get<ITrack[]>(`/tracks?album=${id}`);
    return tracksResponse.data;
  }
);