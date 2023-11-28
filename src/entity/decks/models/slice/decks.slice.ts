import { Sort } from '@/components/ui/table/thead/thead'
import { decksAPI } from '@/entity/decks/api/decks.api'
import { DecksResponse } from '@/entity/decks/api/decks.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: InitialState = {
  filters: {
    authorId: '',
    maxCardsCount: undefined,
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
  extraReducers: builder => {
    builder.addMatcher(decksAPI.endpoints.getDecks.matchFulfilled, (state, action) => {
      state.filters.maxCardsCount = action.payload.maxCardsCount
    })
  },
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
      state.pagination.currentPage = initialState.pagination.currentPage
    },
    setMaxCardsCount: (state, action: PayloadAction<number>) => {
      state.filters.maxCardsCount = action.payload
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
  setMaxCardsCount,
  setOrderBy,
  setSearchByName,
  setSliderValue,
} = slice.actions

type InitialState = {
  filters: {
    authorId: string
    maxCardsCount?: number
    name: string
    orderBy?: Sort
    slidersValue: [number, number] | undefined
  }
} & Pick<DecksResponse, 'pagination'>
