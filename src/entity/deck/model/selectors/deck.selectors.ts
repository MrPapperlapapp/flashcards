import { RootState } from '@/app/store.ts'

export const deckIdSelector = (state: RootState): string | undefined => state.deck.deckId
