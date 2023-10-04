import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrackMutation, ITrackMutationPost } from '../type';
import axiosApi from '../axiosApi';

export const fetchTrack = createAsyncThunk<ITrackMutation, string>('track/fetch', async (id) => {
  const tracksResponse = await axiosApi.get<ITrackMutation>(`/tracks?album=${id}`);
  return tracksResponse.data;
});

export const createTrack = createAsyncThunk<void, ITrackMutationPost>(
  'track/create',
  async (data) => {
    const request = await axiosApi.post('/tracks', data);
    return request.data;
  },
);

export const deleteTrack = createAsyncThunk<void, string>('track/delete', async (id) => {
  await axiosApi.delete('/tracks/' + id);
});

export const changeStatusTrack = createAsyncThunk<void, string>('track/change', async (id) => {
  await axiosApi.patch('/tracks/' + id + '/togglePublished');
});
