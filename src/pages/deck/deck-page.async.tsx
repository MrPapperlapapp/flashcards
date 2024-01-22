import { lazy } from 'react'

const DeckPage = lazy(() =>
  import('./deck-page.tsx').then(module => ({ default: module.DeckPage }))
)
export const DeckPageAsync = () => {
  return <DeckPage />
}
