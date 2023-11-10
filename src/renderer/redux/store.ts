import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './slice/clientes';
// ...

const store = configureStore({
  reducer: {
    clientSlice: clientReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type Dispatch = typeof store.dispatch

export default store;
