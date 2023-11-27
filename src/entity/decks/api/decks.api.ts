import { baseApi } from '@/app/baseApi'
import { RootState } from '@/app/store'
import { Deck, DecksParams, DecksResponse } from '@/entity/decks/api/decks.types'

export const decksAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    createDecks: builder.mutation<Deck, FormData>({
      invalidatesTags: [{ id: 'LIST', type: 'Decks' }],
      onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
        const {
          decks: {
            filters: { authorId, name, orderBy, slidersValue },
            pagination: { currentPage, itemsPerPage },
          },
        } = getState() as RootState

        try {
          const result = await queryFulfilled

          dispatch(
            decksAPI.util.updateQueryData(
              'getDecks',
              {
                authorId: authorId,
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                maxCardsCount: (slidersValue?.[1] && `${slidersValue[1]}`) || undefined,
                minCardsCount: (slidersValue?.[0] && `${slidersValue[0]}`) || undefined,
                name: name,
                orderBy: orderBy ? `${orderBy.key}-${orderBy.direction}` : undefined,
              },
              draft => {
                draft?.items?.unshift(result.data)
              }
            )
          )
        } catch (e) {
          console.log(e)
        }
      },
      query: params => ({
        body: params,
        formData: true,
        method: 'POST',
        url: `v1/decks`,
      }),
    }),
    deleteDeck: builder.mutation<any, { id: string }>({
      invalidatesTags: (_result, _errors, args) => [{ id: args.id, type: 'Decks' }],
      onQueryStarted: async ({ id }, { dispatch, getState, queryFulfilled }) => {
        const {
          decks: {
            filters: { authorId, name, orderBy, slidersValue },
            pagination: { currentPage, itemsPerPage },
          },
        } = getState() as RootState
        const patchResult = dispatch(
          decksAPI.util.updateQueryData(
            'getDecks',
            {
              authorId: authorId,
              currentPage: currentPage,
              itemsPerPage: itemsPerPage,
              maxCardsCount: (slidersValue?.[1] && `${slidersValue[1]}`) || undefined,
              minCardsCount: (slidersValue?.[0] && `${slidersValue[0]}`) || undefined,
              name: name,
              orderBy: orderBy ? `${orderBy.key}-${orderBy.direction}` : undefined,
            },
            draft => {
              draft?.items?.splice(draft?.items?.findIndex(deck => deck.id === id), 1)
            }
          )
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo()
        }
      },
      query: params => ({
        formData: true,
        method: 'DELETE',
        url: `v1/decks/${params.id}`,
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

export const { useCreateDecksMutation, useDeleteDeckMutation, useGetDecksQuery } = decksAPI
