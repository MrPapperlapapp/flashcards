import { Pagination } from '@/entity/decks/api'

export type Cards = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type CardsResponse = {
  items: Cards[]
} & Pagination
