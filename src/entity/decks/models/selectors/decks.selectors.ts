import { RootState } from '@/app/store'

export const currentPageSelector = (state: RootState): number => state.decks.pagination.currentPage
export const itemsPerPageSelector = (state: RootState): number =>
  state.decks.pagination.itemsPerPage
export const authorIdSelector = (state: RootState): string => state.decks.filters.authorId
export const orderBySelector = (state: RootState): string | undefined => state.decks.filters.orderBy
export const searchByNameSelector = (state: RootState): string => state.decks.filters.name
export const tabsSelector = (state: RootState): [number, number] => state.decks.filters.slidersValue
