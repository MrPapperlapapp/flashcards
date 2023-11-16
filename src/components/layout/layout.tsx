import { Header } from '@/components'
import { Table } from '@/components/ui/table'

import s from './layout.module.scss'
export const Layout = () => {
  return (
    <>
      <Header />
      <main className={s.main}>
        <div className={s.container}>
          <Table />
        </div>
      </main>
    </>
  )
}
