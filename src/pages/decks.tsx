import { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { Loading, Pagination, Table, Thead } from '@/components'
import { useGetDecksQuery } from '@/entity/decks/api'
import {
  UseDecksFilters,
  currentPageSelector,
  itemsPerPageSelector,
  setCurrentPage,
} from '@/entity/decks/models'
import { DecksFilters } from '@/entity/decks/ui'

export const Decks = () => {
  const dispatch = useAppDispatch()

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

  const sortedString = useMemo(() => {
    if (!orderBy) {
      return undefined
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const { currentData: decks, isLoading } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage,
    maxCardsCount: (slidersValue?.[1] && `${slidersValue[1]}`) || undefined,
    minCardsCount: (slidersValue?.[0] && `${slidersValue[0]}`) || undefined,
    name,
    orderBy: sortedString,
  })
  const onClickChangeCurrentPageHandler = (page: number) => dispatch(setCurrentPage(page))

  if (isLoading) {
    return <Loading />
  }

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
      <Pagination
        countPerPage={itemsPerPage}
        currentPage={currentPage}
        onChangeCurrentPage={onClickChangeCurrentPageHandler}
        totalCount={decks?.pagination?.totalItems || 1}
      />
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
