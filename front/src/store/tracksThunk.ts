import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrackMutation } from '../type';
import axiosApi from '../axiosApi';

export const fetchTrack = createAsyncThunk<ITrackMutation, string>(
  'track/fetch',
  async (id) => {
    const tracksResponse = await axiosApi.get<ITrackMutation>(`/tracks?album=${id}`);
    return tracksResponse.data;
  }
);