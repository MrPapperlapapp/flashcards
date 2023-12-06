import { baseApi } from '@/app/baseApi'
import { CardsResponse, EditCardsParams } from '@/entity/deck/api/deck.types'
import { Deck } from '@/entity/decks/api'

const deckAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    editCard: builder.mutation<any, EditCardsParams>({
      invalidatesTags: (_result, _errors, args) => [{ id: args.id, type: 'Cards' as const }],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const result = dispatch(
          deckAPI.util.updateQueryData('getCards', { id: args.deckId }, draft => {
            const card = draft?.items?.find(d => d.id === args.id)

            if (card) {
              if (args.answer) {
                card.answer = args.answer
              }
              if (args.question) {
                card.question = args.question
              }
              if (args.answerImg) {
                card.answerImg = URL.createObjectURL(args.answerImg)
              }
              if (args.questionImg) {
                card.questionImg = URL.createObjectURL(args.questionImg)
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (e) {
          result.undo()
        }
      },
      query: ({ id, ...body }) => {
        const formData = new FormData()
        const { answer, answerImg, question, questionImg } = { ...body }

        answer && formData.append('answer', answer)
        answerImg && formData.append('answerImg', answerImg)
        question && formData.append('question', question)
        questionImg && formData.append('questionImg', questionImg)

        return {
          FormData,
          body: formData,
          method: 'PATCH',
          url: `v1/cards/${id}`,
        }
      },
    }),
    editGrade: builder.mutation<any, { cardId: string; deckId: string; grade: number }>({
      invalidatesTags: (_result, _errors, args) => [{ id: args.cardId, type: 'Cards' as const }],
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        const result = dispatch(
          deckAPI.util.updateQueryData('getCards', { id: args.deckId }, draft => {
            const card = draft?.items?.find(d => d.id === args.cardId)

            if (card) {
              if (args.grade) {
                card.grade = args.grade
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (e) {
          result.undo()
        }
      },
      query: ({ deckId, ...body }) => ({
        body: body,
        method: 'POST',
        url: `v1/decks/${deckId}/learn`,
      }),
    }),
    getCards: builder.query<CardsResponse, { id: string }>({
      providesTags: (result, _error, _arg) =>
        result
          ? [
              { id: 'LIST', type: 'Cards' },
              ...result.items.map(({ id }) => ({ id, type: 'Cards' as const })),
            ]
          : [{ id: 'LIST', type: 'Cards' }],
      query: ({ id, ...params }) => ({
        method: 'GET',
        params: params || {},
        url: `v1/decks/${id}/cards`,
      }),
    }),
    getDeck: builder.query<Deck, { id: string }>({
      providesTags: (_result, _errors, args) => [{ id: args.id, type: 'Decks' }],
      query: ({ id }) => ({
        method: 'GET',
        url: `v1/decks/${id}`,
      }),
    }),
  }),
})

export const { useEditCardMutation, useEditGradeMutation, useGetCardsQuery, useGetDeckQuery } =
  deckAPI
