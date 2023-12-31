import { RootState } from '@/app/store'
import { Sort } from '@/components/ui/table/thead/thead'

export const currentPageSelector = (state: RootState): number => state.decks.pagination.currentPage
export const itemsPerPageSelector = (state: RootState): number =>
  state.decks.pagination.itemsPerPage
export const authorIdSelector = (state: RootState): string => state.decks.filters.authorId
export const orderBySelector = (state: RootState): Sort | undefined => state.decks.filters.orderBy
export const searchByNameSelector = (state: RootState): string => state.decks.filters.name
export const tabsSelector = (state: RootState): [number, number] | undefined =>
  state.decks.filters.slidersValue

export const getMaxCardsCount = (state: RootState): number | undefined =>
  state.decks.filters.maxCardsCount
