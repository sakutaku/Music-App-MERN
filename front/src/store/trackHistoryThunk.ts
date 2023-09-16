import axiosApi from '../axiosApi';
import { ITrackHistoryData } from '../type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createTrackHistory = createAsyncThunk<void, ITrackHistoryData>(
  'trackHistory/create',
  async (data) => {
    const request = await axiosApi.post('/track_history', data.trackId, {headers: {Authorization: data.token}});
    return request.data;
  }
);