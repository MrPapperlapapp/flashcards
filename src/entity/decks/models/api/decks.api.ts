import { baseApi } from '@/app/baseApi'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, DecksParams>({
      providesTags: ['Decks'],
      query: params => ({
        method: 'GET',
        params: params ?? {},
        url: `v1/decks`,
      }),
    }),
  }),
})

export const { useGetDecksQuery } = decksAPI

export type Deck = {
  author: {
    id: string
    name: string
  }
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  rating: number
  shots: number
  updated: string
  userId: string
}
export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
export type DecksResponse = {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export type OrderByField = 'cardsCount' | 'createdBy' | 'name' | 'updated'
export type OrderByDirection = 'asc' | 'desc'
export type DecksParams = {
  authorId?: string
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: `${OrderByField}-${OrderByDirection}`
} | void
