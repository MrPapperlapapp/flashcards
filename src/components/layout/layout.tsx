import { Outlet } from 'react-router-dom'

import { Header } from '@/components'
import { Loading } from '@/components/ui/loading/loading'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'

import s from './layout.module.scss'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

export const Layout = () => {
  const { data, isLoading: isLoadingMe } = useGetMeQuery()
  const isLoading = isLoadingMe
  // const isLoading = true
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <Header data={data} />
      <main className={s.main}>
        <div className={s.container}>
          <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Outlet />
          </QueryParamProvider>
        </div>
      </main>
    </>
  )
}
