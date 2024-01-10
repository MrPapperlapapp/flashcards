import { baseApi } from '@/app/baseApi'
import { LearnResponse } from '@/entity/learn/api/learn.types'

const learnApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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

export const { useGetQuestionQuery } = learnApi
