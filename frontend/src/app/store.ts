import {configureStore, combineReducers} from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {postReducer} from "../containers/posts/postsSlice.ts";
import {infoReducer} from "../containers/fullPost/fullPostSlice.ts";
import {commentReducer} from "../containers/comments/commentsSlice.ts";
import {usersReducer} from "../containers/users/usersSlice.ts";


const usersPersistConfig = {
  key: 'forum:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  posts: postReducer,
  info: infoReducer,
  comments: commentReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

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
export const persister = persistStore(store);