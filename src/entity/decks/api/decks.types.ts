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
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: string
  minCardsCount?: string
  name?: string
  orderBy?: `${OrderByField}-${OrderByDirection}` | string
} | void
