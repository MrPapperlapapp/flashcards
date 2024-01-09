import { ReactNode } from 'react'

import { Cards } from '@/entity/deck/api/deck.types'
import { Trow } from '@/entity/deck/ui/deck/deck-table/trow/trow'

import s from './deck-table.module.scss'

export const DeckTable = ({ children, data }: PropsType) => {
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
  data?: Cards[]
}
