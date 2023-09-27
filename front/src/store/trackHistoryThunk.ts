import axiosApi from '../axiosApi';
import {ITrackHistory, ITrackHistoryData} from '../type';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTrackHistory = createAsyncThunk<ITrackHistory[]>(
    'trackHistory/fetch',
    async () => {
        const request = await axiosApi.get<ITrackHistory[]>('/track_history');
        return request.data;
    }
);
export const createTrackHistory = createAsyncThunk<void, ITrackHistoryData>(
  'trackHistory/create',
  async (data) => {
    const request = await axiosApi.post('/track_history', data.info);
    return request.data;
  }
);

