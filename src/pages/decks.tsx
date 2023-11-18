import { useMemo, useState } from 'react'

import { useAppSelector } from '@/app/store'
import { Table } from '@/components/ui/table'
import { Sort, Thead } from '@/components/ui/table/thead/thead'
import { useGetDecksQuery } from '@/entity/decks/models/api/decks.api.ts'
import { UseDecksFilters } from '@/entity/decks/models/hooks/useDecksFilters'
import { currentPageSelector } from '@/entity/decks/models/selectors/decks.selectors'
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

  const [sort, setSort] = useState<Sort>(null)
  const currentPage = useAppSelector(currentPageSelector)
  const sortedString = useMemo(() => {
    if (!sort) {
      return ''
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data, isLoading } = useGetDecksQuery()

  return (
    <>
      <DecksFilters
        authorId={authorId}
        name={name}
        setAuthorIdHandler={setAuthorIdHandler}
        setSearchByNameHandler={setSearchByNameHandler}
        setSliderValueHandler={setSliderValueHandler}
        sliderValue={slidersValue}
      />
      <Table data={data?.items}>
        <Thead columns={columns} onSort={sort => setSort(sort)} sort={sort} />
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
