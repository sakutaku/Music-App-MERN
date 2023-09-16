import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../store/artistsSlice';
import { albumsReducer } from '../store/albumsSlice';
import { tracksReducer } from '../store/tracksSlice';
import { usersReducer } from '../store/usersSlice';
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST , PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { tracksHistoryReducer } from '../store/trackHistorySlice';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: tracksHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);