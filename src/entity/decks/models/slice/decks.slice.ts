import { Sort } from '@/components/ui/table/thead/thead'
import { DecksResponse } from '@/entity/decks/models/api/decks.api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: InitialState = {
  filters: {
    authorId: '',
    name: '',
    orderBy: undefined,
    slidersValue: undefined,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  },
}
const slice = createSlice({
  initialState,
  name: 'decks',
  reducers: {
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.filters.authorId = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload
    },
    setOrderBy: (state, action: PayloadAction<Sort>) => {
      state.filters.orderBy = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.filters.name = action.payload
    },
    setSliderValue: (state, action: PayloadAction<[number, number]>) => {
      state.filters.slidersValue = action.payload
    },
  },
})

export const decksReducer = slice.reducer
export const {
  setAuthorId,
  setCurrentPage,
  setItemsPerPage,
  setOrderBy,
  setSearchByName,
  setSliderValue,
} = slice.actions

type InitialState = {
  filters: {
    authorId: string
    name: string
    orderBy?: Sort
    slidersValue: [number, number] | undefined
  }
} & Pick<DecksResponse, 'pagination'>
