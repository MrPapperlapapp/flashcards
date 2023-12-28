import { Provider } from 'react-redux'

import { store } from '@/app/store'
import { Decks } from '@/pages/decks'
import { render, screen } from '@testing-library/react'

describe('Decks Page Test', () => {
  test('work with value', () => {
    render(
      <Provider store={store}>
        <Decks />
      </Provider>
    )
    const link = screen.getByText(/Create Deck/i)

    console.log(link)
    expect(link).toBeInTheDocument()
  })
})
