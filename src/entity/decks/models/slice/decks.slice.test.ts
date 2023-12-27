import {
  DecksInitialState,
  decksReducer,
  setAuthorId,
  setCurrentPage,
  setItemsPerPage,
  setSearchByName,
} from '@/entity/decks/models'
import { DeepPartial } from '@reduxjs/toolkit'

describe('decks.slice.test', () => {
  test('set current page', () => {
    const state: DeepPartial<DecksInitialState> = {
      pagination: {
        currentPage: 1,
      },
    }

    expect(
      decksReducer(state as DecksInitialState, setCurrentPage(100)).pagination.currentPage
    ).toEqual(100)
  })
  test('set author Id', () => {
    const state: DeepPartial<DecksInitialState> = {
      filters: {
        authorId: 'sadsda sdasd',
      },
    }

    expect(decksReducer(state as DecksInitialState, setAuthorId('')).filters.authorId).toEqual('')
  })
  test('set items per page', () => {
    const state: DeepPartial<DecksInitialState> = {
      pagination: {
        itemsPerPage: 0,
      },
    }

    expect(
      decksReducer(state as DecksInitialState, setItemsPerPage(333)).pagination.itemsPerPage
    ).toEqual(333)
  })
  test('set search name', () => {
    const state: DeepPartial<DecksInitialState> = {
      filters: {
        name: 'Jawohl',
      },
    }

    expect(decksReducer(state as DecksInitialState, setSearchByName('jein')).filters.name).toEqual(
      'jein'
    )
  })
})
