import { ReactNode } from 'react'

import { Deck } from '@/entity/decks/api'
import { Trow } from '@/entity/decks/ui/decks-table/trow'

import s from './decks-table.module.scss'

export const DecksTable = ({ children, data }: PropsType) => {
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
