import { useAppDispatch, useAppSelector } from '@/app/store'
import { OrderByDirection, OrderByField } from '@/entity/decks/models/api/decks.api.ts'
import {
  authorIdSelector,
  orderBySelector,
  searchByNameSelector,
  tabsSelector,
} from '@/entity/decks/models/selectors/decks.selectors'
import {
  setAuthorId,
  setOrderBy,
  setSearchByName,
  setSliderValue,
} from '@/entity/decks/models/slice/decks.slice'

export const UseDecksFilters = () => {
  const slidersValue = useAppSelector(tabsSelector)
  const authorId = useAppSelector(authorIdSelector)
  const name = useAppSelector(searchByNameSelector)
  const orderBy = useAppSelector(orderBySelector)
  const dispatch = useAppDispatch()

  const setSliderValueHandler = (value: [number, number]) => dispatch(setSliderValue(value))
  const setAuthorIdHandler = (id: string) => dispatch(setAuthorId(id))
  const setSearchByNameHandler = (name: string) => dispatch(setSearchByName(name))
  const setOrderByHandler = (order: `${OrderByField}-${OrderByDirection}`) =>
    dispatch(setOrderBy(order))

  return {
    authorId,
    name,
    orderBy,
    setAuthorIdHandler,
    setOrderByHandler,
    setSearchByNameHandler,
    setSliderValueHandler,
    slidersValue,
  }
}
