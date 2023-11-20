import { useMemo } from 'react'

import { useAppSelector } from '@/app/store'
import { Table } from '@/components/ui/table'
import { Thead } from '@/components/ui/table/thead/thead'
import {
  OrderByDirection,
  OrderByField,
  useGetDecksQuery,
} from '@/entity/decks/models/api/decks.api'
import { UseDecksFilters } from '@/entity/decks/models/hooks/useDecksFilters'
import {
  currentPageSelector,
  itemsPerPageSelector,
} from '@/entity/decks/models/selectors/decks.selectors'
import { DecksFilters } from '@/entity/decks/models/ui/decks-filters/decks-filters'

import s from './decks.module.scss'

export const Decks = () => {
  const {
    authorId,
    name,
    orderBy,
    setAuthorIdHandler,
    setOrderByHandler,
    setSearchByNameHandler,
    setSliderValueHandler,
    slidersValue,
  } = UseDecksFilters()

  const currentPage = useAppSelector(currentPageSelector)
  const itemsPerPage = useAppSelector(itemsPerPageSelector)

  const sortedString: `${OrderByField}-${OrderByDirection}` | string = useMemo(() => {
    if (!orderBy) {
      return ''
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const { data: decks } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage,
    maxCardsCount: slidersValue?.[1] || undefined,
    minCardsCount: slidersValue?.[0] || undefined,
    name,
    orderBy: sortedString,
  })

  return (
    <>
      <DecksFilters
        authorId={authorId}
        maxCardsCount={decks?.maxCardsCount}
        name={name}
        setAuthorIdHandler={setAuthorIdHandler}
        setSearchByNameHandler={setSearchByNameHandler}
        setSliderValueHandler={setSliderValueHandler}
        sliderValue={slidersValue}
      />
      <Table data={decks?.items}>
        <Thead columns={columns} onSort={setOrderByHandler} sort={orderBy} />
      </Table>
    </>
  )
}

const columns = [
  {
    key: 'name',
    sortable: true,
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]
