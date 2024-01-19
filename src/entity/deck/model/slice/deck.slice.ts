import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pagination } from '@/entity/decks/api'

const initialState: InitialStateType = {
  pagination: {
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
  },
  deckId: '',
}

const slice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    setDeckCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setDeckItemPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload
    },
  },
})

export const deckReducer = slice.reducer
export const { setDeckCurrentPage, setDeckItemPerPage } = slice.actions
type InitialStateType = {
  pagination: Pagination
  deckId: string
}
