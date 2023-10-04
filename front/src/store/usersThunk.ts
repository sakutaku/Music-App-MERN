import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterMutation, RegisterResponse, ValidationError, GlobalError } from '../type';
import { isAxiosError } from 'axios';
import axiosApi from '../axiosApi';
import { clearUser } from './usersSlice';

export const fetchRegister = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation: RegisterMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const fetchLogin = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const fetchGoogleLogin = createAsyncThunk<
  RegisterResponse,
  string,
  { rejectValue: GlobalError }
>('users/google', async (credential, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users/google', { credential });
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }

    throw e;
  }
});

export const logout = createAsyncThunk('users/logout', async (_, { dispatch }) => {
  await axiosApi.delete('users/sessions');
  dispatch(clearUser());
});
