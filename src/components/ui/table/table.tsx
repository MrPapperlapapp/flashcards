import { ReactNode } from 'react'

import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'
import { Deck } from '@/entity/decks/models/api/decks.api'

import s from './table.module.scss'

export const Table = ({ children, data }: PropsType) => {
  return (
    <>
      <table className={s.table}>
        {children}
        <tbody className={s.tbody}>
          {data?.map(item => (
            <tr className={s.tr_body} key={item.id}>
              <td>{item.name}</td>
              <td>{item.cardsCount}</td>
              <td>{item.updated}</td>
              <td>{item.author.name}</td>
              <td>
                <LearnIcon />
                <EditIcon />
                <DeleteIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data && <div className={s.empty_line}>Empty</div>}
    </>
  )
}

type PropsType = {
  children: ReactNode
  data?: Deck[]
}
