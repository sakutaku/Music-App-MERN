import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrackMutation, ITrackMutationPost } from '../type';
import axiosApi from '../axiosApi';
import { RootState } from '../app/store';

export const fetchTrack = createAsyncThunk<ITrackMutation, string>(
  'track/fetch',
  async (id) => {
    const tracksResponse = await axiosApi.get<ITrackMutation>(`/tracks?album=${id}`);
    return tracksResponse.data;
  }
);

export const createTrack = createAsyncThunk<void, ITrackMutationPost, {state: RootState}>(
  'track/create',
  async (data, thunkAPI) => {
    const usersState = thunkAPI.getState().users;
    const token = usersState.user?.token;

    const request = await axiosApi.post('/tracks', data, {headers: {Authorization: token}});
    return request.data;
  }
);