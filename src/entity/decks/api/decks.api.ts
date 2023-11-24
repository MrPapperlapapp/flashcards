import { baseApi } from '@/app/baseApi'
import { Deck, DecksParams, DecksResponse } from '@/entity/decks/api/decks.types'

const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    createDecks: builder.mutation<Deck, FormData>({
      invalidatesTags: [{ id: 'LIST', type: 'Decks' }],
      query: params => ({
        body: params,
        formData: true,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),
    getDecks: builder.query<DecksResponse, DecksParams>({
      providesTags: (result, _error, _arg) =>
        result
          ? [
              { id: 'LIST', type: 'Decks' },
              ...result.items.map(({ id }) => ({ id, type: 'Decks' as const })),
            ]
          : [{ id: 'LIST', type: 'Decks' }],
      query: params => ({
        method: 'GET',
        params: params ?? {},
        url: `v1/decks`,
      }),
    }),
  }),
})

export const { useCreateDecksMutation, useGetDecksQuery } = decksAPI
