import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from '@/app/app.slice'
import { baseApi } from '@/app/baseApi'
import { decksReducer } from '@/entity/decks/models/slice/decks.slice'
import { configureStore } from '@reduxjs/toolkit'
import { deckReducer } from '@/entity/deck/model/slice/deck.slice.ts'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    app: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    decks: decksReducer,
    deck: deckReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
