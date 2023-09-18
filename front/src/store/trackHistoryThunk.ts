import axiosApi from '../axiosApi';
import {ITrackHistory, ITrackHistoryData} from '../type';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTrackHistory = createAsyncThunk<ITrackHistory[],string>(
    'trackHistory/fetch',
    async (token) => {
        const request = await axiosApi.get<ITrackHistory[]>('/track_history', {headers: {Authorization: token}});
        return request.data;
    }
);
export const createTrackHistory = createAsyncThunk<void, ITrackHistoryData>(
  'trackHistory/create',
  async (data) => {
    const request = await axiosApi.post('/track_history', data.info, {headers: {Authorization: data.token}});
    return request.data;
  }
);

