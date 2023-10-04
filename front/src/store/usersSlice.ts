import { GlobalError, User, ValidationError } from '../type';
import { createSlice } from '@reduxjs/toolkit';
import { fetchGoogleLogin, fetchLogin, fetchRegister } from './usersThunk';
import { RootState } from '../app/store';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, { payload: userResponse }) => {
      state.registerLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(fetchRegister.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, { payload: userResponse }) => {
      state.loginLoading = false;
      state.user = userResponse.user;
    });
    builder.addCase(fetchLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(fetchGoogleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(fetchGoogleLogin.fulfilled, (state, { payload: userResponce }) => {
      state.loginLoading = false;
      state.user = userResponce.user;
    });
    builder.addCase(fetchGoogleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterError = (state: RootState) => state.users.registerError;

export const selectLoginError = (state: RootState) => state.users.loginError;
export const { clearUser } = usersSlice.actions;
