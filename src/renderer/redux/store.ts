import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import clientReducer from './slice/clientes';
import productReducer from './slice/productos';
// ...

const store = configureStore({
  reducer: {
    clientSlice: clientReducer,
    productSlice: productReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<Promise<unknown>, RootState, unknown, Action<unknown>>

export default store;
