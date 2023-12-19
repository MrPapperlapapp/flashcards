import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: InitialStateType = {
  lang: 'en',
}

const slice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    changeLang: (state, action: PayloadAction<LangType>) => {
      state.lang = action.payload
    },
  },
})

export const appReducer = slice.reducer
export const { changeLang } = slice.actions
type InitialStateType = {
  lang: LangType
}

export type LangType = 'de' | 'en' | 'ru'
