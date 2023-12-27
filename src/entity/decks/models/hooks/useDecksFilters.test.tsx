import { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app/store'
import { useDecksFilters } from '@/entity/decks/models'
import { act, renderHook } from '@testing-library/react'

describe('useDeckFilters.test', () => {
  test('get filters values', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    const { result } = renderHook(() => useDecksFilters(), { wrapper })

    act(() => {
      result.current.setSearchByNameHandler('Jawohl')
      result.current.setSliderValueHandler([33, 99])
      result.current.setAuthorIdHandler('eas3234-esa111s-18elfis3')
    })

    expect(result.current.name).toEqual('Jawohl')
    expect(result.current.slidersValue).toEqual([33, 99])
    expect(result.current.authorId).toEqual('eas3234-esa111s-18elfis3')
  })
})
