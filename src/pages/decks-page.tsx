import { useMemo } from 'react'
import { Pagination, Thead } from '@/components'
import { useGetDecksQuery } from '@/entity/decks/api'
import { useDecksFilters } from '@/entity/decks/models'
import { DecksFilters } from '@/entity/decks/ui'
import { DecksTable } from '@/entity/decks/ui/decks-table/decks-table'
import { NumberParam, useQueryParam } from 'use-query-params'

export const DecksPage = () => {
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

  const [currentPage, setCurrentPage] = useQueryParam('page', NumberParam)
  const [itemsPerPage, setItemsPerPage] = useQueryParam('items', NumberParam)

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
  const onClickChangeCurrentPageHandler = (page: number) => setCurrentPage(page)
  const onClickChangeItemsPerPage = (value: string) => setItemsPerPage(+value)

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
        countPerPage={itemsPerPage || 10}
        currentPage={currentPage || 1}
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
