import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pagination } from '@/entity/decks/api'

const initialState: InitialStateType = {
  pagination: {
    totalPages: 4,
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 33,
  },
  deckId: '',
}

const slice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    setDeckId: (state, action: PayloadAction<string>) => {
      state.deckId = action.payload
    },
  },
})

export const deckReducer = slice.reducer
export const { setDeckId } = slice.actions
type InitialStateType = {
  pagination: Pagination
  deckId: string
}
