import { Outlet } from 'react-router-dom'

import { Header } from '@/components'
import { Loading } from '@/components/ui/loading/loading'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'

import s from './layout.module.scss'
import { useGetDecksQuery } from '@/entity/decks/api'
import { currentPageSelector, itemsPerPageSelector, useDecksFilters } from '@/entity/decks/models'
import { useAppSelector } from '@/app/store.ts'
import { useMemo } from 'react'

export const Layout = () => {
  const { authorId, name, orderBy, slidersValue } = useDecksFilters()

  const currentPage = useAppSelector(currentPageSelector)
  const itemsPerPage = useAppSelector(itemsPerPageSelector)

  const sortedString = useMemo(() => {
    if (!orderBy) {
      return undefined
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const { data, isLoading: isLoadingMe } = useGetMeQuery()
  const { isLoading: isLoadingDecks } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage,
    maxCardsCount: (slidersValue?.[1] && `${slidersValue[1]}`) || undefined,
    minCardsCount: (slidersValue?.[0] && `${slidersValue[0]}`) || undefined,
    name,
    orderBy: sortedString,
  })
  const isLoading = isLoadingDecks || isLoadingMe

  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <Header data={data} />
      <main className={s.main}>
        <div className={s.container}>
          <Outlet />
        </div>
      </main>
    </>
  )
}
