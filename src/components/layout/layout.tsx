import { Outlet } from 'react-router-dom'

import { Header } from '@/components'
import { Loading } from '@/components/ui/loading/loading'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'

import s from './layout.module.scss'

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
          <Outlet />
        </div>
      </main>
    </>
  )
}
