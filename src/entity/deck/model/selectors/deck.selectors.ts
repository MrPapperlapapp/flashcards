import { RootState } from '@/app/store.ts'

export const setDeckCurrentPageSelector = (state: RootState): number =>
  state.deck.pagination.currentPage
export const setDeckItemPerPageSelector = (state: RootState): number =>
  state.deck.pagination.itemsPerPage
