import { useState } from 'react'

import { ChevronDownIcon } from '@/assets/icons/chevron-down-icon'
import { ChevronUpIcon } from '@/assets/icons/chevron-up-icon'
import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'

import s from './table.module.scss'

export const Table = ({ columns, data }: PropsType) => {
  const [sort, setSort] = useState<Sort>(null)

  const handleSort = (key: string) => {
    if (sort && sort.key) {
      if (sort.direction === 'asc') {
        setSort({ direction: 'desc', key: key })
      }
      if (sort.direction === 'desc') {
        setSort(null)
      }
    } else {
      setSort({ direction: 'asc', key: key })
    }
  }

  return (
    <>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr_head}>
            {columns.map(c => (
              <th key={c.key} onClick={() => handleSort(c.title)}>
                {c.title}
                {sort && sort.key === c.title && (
                  <span className={s.sortIcon}>
                    {sort.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </span>
                )}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {data?.map(item => (
            <tr className={s.tr_body} key={item.title}>
              <td>{item.title}</td>
              <td>{item.cardsCount}</td>
              <td>{item.updated}</td>
              <td>{item.createdBy}</td>
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

type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

type PropsType = {
  columns: {
    key: string
    title: string
  }[]
  data?: {
    cardsCount: number
    createdBy: string
    title: string
    updated: string
  }[]
}
