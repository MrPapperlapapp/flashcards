import { Provider } from 'react-redux'

import { store } from '@/app/store'
import { DecksPage } from '@/pages/decks-page.tsx'
import { render, screen } from '@testing-library/react'

describe('DecksPage Page Test', () => {
  test('work with value', () => {
    render(
      <Provider store={store}>
        <DecksPage />
      </Provider>
    )
    const link = screen.getByText(/Create DeckPage/i)

    console.log(link)
    expect(link).toBeInTheDocument()
  })
})
