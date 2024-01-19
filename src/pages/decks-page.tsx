import { useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { Pagination, Thead } from '@/components'
import { useGetDecksQuery } from '@/entity/decks/api'
import {
  currentPageSelector,
  itemsPerPageSelector,
  setCurrentPage,
  setItemsPerPage,
  useDecksFilters,
} from '@/entity/decks/models'
import { DecksFilters } from '@/entity/decks/ui'
import { DecksTable } from '@/entity/decks/ui/decks-table/decks-table'

export const DecksPage = () => {
  const dispatch = useAppDispatch()

  const {
    authorId,
    maxCardCount,
    name,
    orderBy,
    setAuthorIdHandler,
    setOrderByHandler,
    setSearchByNameHandler,
    setSliderValueHandler,
    slidersValue,
  } = useDecksFilters()

  const currentPage = useAppSelector(currentPageSelector)
  const itemsPerPage = useAppSelector(itemsPerPageSelector)
  const sortedString = useMemo(() => {
    if (!orderBy) {
      return undefined
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const { currentData: decks, isFetching } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage,
    maxCardsCount: (slidersValue?.[1] && `${slidersValue[1]}`) || undefined,
    minCardsCount: (slidersValue?.[0] && `${slidersValue[0]}`) || undefined,
    name,
    orderBy: sortedString,
  })
  const onClickChangeCurrentPageHandler = (page: number) => dispatch(setCurrentPage(page))
  const onClickChangeItemsPerPage = (value: string) => dispatch(setItemsPerPage(+value))
  return (
    <>
      <DecksFilters
        authorId={authorId}
        maxCardsCount={decks?.maxCardsCount ?? maxCardCount}
        name={name}
        setAuthorIdHandler={setAuthorIdHandler}
        setSearchByNameHandler={setSearchByNameHandler}
        setSliderValueHandler={setSliderValueHandler}
        sliderValue={slidersValue}
      />
      <DecksTable data={decks?.items} isLoading={isFetching}>
        <Thead columns={columns} onSort={setOrderByHandler} sort={orderBy} />
      </DecksTable>
      <Pagination
        countPerPage={itemsPerPage}
        currentPage={currentPage}
        onChangeCurrentPage={onClickChangeCurrentPageHandler}
        totalCount={decks?.pagination?.totalItems || 1}
        onChangeItemsPerPage={onClickChangeItemsPerPage}
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
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]
