import { baseApi } from '@/app/baseApi'
import { CardsResponse } from '@/entity/deck/api/deck.types'

const deckAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCards: builder.query<CardsResponse, { id: string }>({
      query: ({ id, ...params }) => ({
        method: 'GET',
        params: params || {},
        url: `v1/decks/${id}/cards`,
      }),
    }),
  }),
})

export const { useGetCardsQuery } = deckAPI
