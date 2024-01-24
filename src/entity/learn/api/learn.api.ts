import { baseApi } from '@/app/baseApi'
import { LearnResponse } from '@/entity/learn/api/learn.types'

const learnApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editGrade: builder.mutation<any, { cardId: string; deckId: string; grade: number }>({
      // invalidatesTags: (_result, _errors, { cardId }) => [{ id: cardId, type: 'Cards' as const }],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data: newCard } = await queryFulfilled

          dispatch(
            learnApi.util.updateQueryData('getQuestion', { id: args.deckId }, () => {
              return newCard
            })
          )
        } catch (e) {
          console.log(e)
        }
      },
      query: ({ deckId, ...body }) => ({
        body: body,
        method: 'POST',
        url: `v1/decks/${deckId}/learn`,
      }),
    }),
    getQuestion: builder.query<LearnResponse, { id?: string; previousCardId?: string }>({
      providesTags: ['Learn'],
      query: ({ id, ...params }) => ({
        method: 'GET',
        params: params || {},
        url: `v1/decks/${id}/learn`,
      }),
    }),
  }),
})

export const { useEditGradeMutation, useGetQuestionQuery } = learnApi
