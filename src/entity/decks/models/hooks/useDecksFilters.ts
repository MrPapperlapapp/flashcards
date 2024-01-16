import { useAppDispatch, useAppSelector } from '@/app/store'
import { Sort } from '@/components/ui/table/thead/thead'
import {
  authorIdSelector,
  getMaxCardsCount,
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

export const useDecksFilters = () => {
  const slidersValue = useAppSelector(tabsSelector)
  const maxCardCount = useAppSelector(getMaxCardsCount)
  const authorId = useAppSelector(authorIdSelector)
  const name = useAppSelector(searchByNameSelector)
  const orderBy = useAppSelector(orderBySelector)
  const dispatch = useAppDispatch()

  const setSliderValueHandler = (value: [number, number]) => dispatch(setSliderValue(value))
  const setAuthorIdHandler = (id: string) => dispatch(setAuthorId(id))
  const setSearchByNameHandler = (name: string) => dispatch(setSearchByName(name))
  const setOrderByHandler = (sort: Sort) => dispatch(setOrderBy(sort))

  return {
    authorId,
    maxCardCount,
    name,
    orderBy,
    setAuthorIdHandler,
    setOrderByHandler,
    setSearchByNameHandler,
    setSliderValueHandler,
    slidersValue,
  }
}
