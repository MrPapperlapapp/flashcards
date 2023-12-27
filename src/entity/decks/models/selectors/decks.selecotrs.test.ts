import { RootState } from '@/app/store'
import { DeepPartial } from '@reduxjs/toolkit'

import {
  authorIdSelector,
  currentPageSelector,
  getMaxCardsCount,
  itemsPerPageSelector,
  orderBySelector,
  searchByNameSelector,
  tabsSelector,
} from './decks.selectors'

describe('currentPageSelector', () => {
  test('work with value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        pagination: {
          currentPage: 1,
        },
      },
    }

    expect(currentPageSelector(state as RootState)).toEqual(1)
  })
  test('work without value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        pagination: {
          currentPage: undefined,
        },
      },
    }

    expect(currentPageSelector(state as RootState)).toEqual(undefined)
  })
})
describe('itemsPerPageSelector', () => {
  test('work with value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        pagination: {
          itemsPerPage: 10,
        },
      },
    }

    expect(itemsPerPageSelector(state as RootState)).toEqual(10)
  })
  test('work without value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        pagination: {
          itemsPerPage: undefined,
        },
      },
    }

    expect(itemsPerPageSelector(state as RootState)).toEqual(undefined)
  })
})
describe('authorIdSelector', () => {
  test('work with value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          authorId: 'esd-d1341sss',
        },
      },
    }

    expect(authorIdSelector(state as RootState)).toEqual('esd-d1341sss')
  })
  test('work without value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          authorId: undefined,
        },
      },
    }

    expect(authorIdSelector(state as RootState)).toEqual(undefined)
  })
})
describe('orderBySelector', () => {
  test('work with value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          orderBy: {
            direction: 'desc',
            key: 'name',
          },
        },
      },
    }

    expect(orderBySelector(state as RootState)).toEqual({ direction: 'desc', key: 'name' })
  })
  test('work without value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          orderBy: undefined,
        },
      },
    }

    expect(orderBySelector(state as RootState)).toEqual(undefined)
  })
})
describe('searchByNameSelector', () => {
  test('work with value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          name: 'BigCityLive',
        },
      },
    }

    expect(searchByNameSelector(state as RootState)).toEqual('BigCityLive')
  })
  test('work without value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          name: undefined,
        },
      },
    }

    expect(searchByNameSelector(state as RootState)).toEqual(undefined)
  })
})
describe('tabsSelector', () => {
  test('work with value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          slidersValue: [0, 100],
        },
      },
    }

    expect(tabsSelector(state as RootState)).toEqual([0, 100])
  })
  test('work without value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          slidersValue: undefined,
        },
      },
    }

    expect(tabsSelector(state as RootState)).toEqual(undefined)
  })
})
describe('getMaxCardsCount', () => {
  test('work with value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          maxCardsCount: 100,
        },
      },
    }

    expect(getMaxCardsCount(state as RootState)).toEqual(100)
  })
  test('work without value', () => {
    const state: DeepPartial<RootState> = {
      decks: {
        filters: {
          maxCardsCount: undefined,
        },
      },
    }

    expect(getMaxCardsCount(state as RootState)).toEqual(undefined)
  })
})
