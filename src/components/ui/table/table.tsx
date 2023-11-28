import { ReactNode } from 'react'

import { Trow } from '@/components'
import { Deck } from '@/entity/decks/api'

import s from './table.module.scss'

export const Table = ({ children, data }: PropsType) => {
  return (
    <>
      <table className={s.table}>
        {children}
        <tbody className={s.tbody}>{data?.map(e => <Trow data={e} key={e.id} />)}</tbody>
      </table>
    </>
  )
}

type PropsType = {
  children: ReactNode
  data?: Deck[]
}
