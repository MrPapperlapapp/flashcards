import { useState } from 'react'

import s from './table.module.scss'

const data = [
  {
    cardsCount: 10,
    createdBy: 'John Doe',
    title: '123456789012345678901234567890',
    updated: '2023-07-07',
  },
  {
    cardsCount: 5,
    createdBy: 'Jane Smith',
    title: 'Project B',
    updated: '2023-07-06',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
]

export const Table = () => {
  const [sort, setSort] = useState<Sort>(null)

  console.log(sort)
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
    <table className={s.table}>
      <thead className={s.thead}>
        <tr className={s.tr_head}>
          <th className={s.tName} onClick={() => handleSort('name')}>
            Name
            {sort && sort.key === 'name' && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
          <th className={s.tCard} onClick={() => handleSort('cardsCount')}>
            Cards
          </th>
          <th className={s.created} onClick={() => handleSort('updated')}>
            Last Updated
          </th>
          <th className={s.createdBy} onClick={() => handleSort('createdBy')}>
            Created by
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr className={s.tr_body} key={item.title}>
            <td className={s.tName}>{item.title}</td>
            <td className={s.tCard}>{item.cardsCount}</td>
            <td className={s.created}>{item.updated}</td>
            <td className={s.createdBy}>{item.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null
