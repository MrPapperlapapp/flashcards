import { useAppSelector } from '@/app/store'
import { Sort } from '@/components/ui/table/thead/thead'
import { getMaxCardsCount } from '@/entity/decks/models/selectors/decks.selectors'
import { DelimitedNumericArrayParam, StringParam, useQueryParam } from 'use-query-params'

export const useDecksFilters = () => {
  const [slidersValue, setSlidersValue] = useQueryParam('slider', DelimitedNumericArrayParam)
  const maxCardCount = useAppSelector(getMaxCardsCount)
  const [authorId, setAuthorId] = useQueryParam('authorId', StringParam)
  const [name, setName] = useQueryParam('name', StringParam)
  const [key, setKey] = useQueryParam('sort', StringParam)
  const [direction, setDirection] = useQueryParam('dir', StringParam)
  const orderBy: Partial<Sort> | undefined =
    key && direction
      ? { key: key, direction: direction === 'desc' || direction === 'asc' ? direction : undefined }
      : undefined

  const setSliderValueHandler = (value: [number, number]) =>
    setSlidersValue(value.length === 2 ? value : undefined)
  const setAuthorIdHandler = (id: string) => setAuthorId(id ? id : undefined)
  const setSearchByNameHandler = (name: string) => setName(name ? name : undefined)
  const setOrderByHandler = (sort: Sort) => {
    console.log('sort', sort)
    if (sort?.key && sort?.direction) {
      setKey(sort.key)
      setDirection(sort.direction)
    } else {
      setKey(undefined)
      setDirection(undefined)
    }
  }

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
