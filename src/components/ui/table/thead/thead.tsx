import { ComponentPropsWithoutRef } from 'react'

import { ChevronDownIcon } from '@/assets/icons/chevron-down-icon'
import { ChevronUpIcon } from '@/assets/icons/chevron-up-icon'
import { Typography } from '@/components'
import { clsx } from 'clsx'

import s from './thead.module.scss'

export const Thead = ({ columns, onSort, sort, ...rest }: PropsType) => {
  const handleSort =
    (key: string, sortable: boolean = false) =>
    () => {
      if (!onSort || !sortable) {
        return
      }

      if (sort?.key !== key) {
        return onSort({ direction: 'asc', key })
      }

      if (sort.direction === 'desc') {
        return onSort(null)
      }

      return onSort({
        direction: sort?.direction === 'asc' ? 'desc' : 'asc',
        key,
      })
    }

  const classNames = {
    cell: (sortable: boolean | undefined) => clsx(sortable && s.sortable),
  }

  return (
    <thead {...rest}>
      <tr>
        {columns.map(c => (
          <th
            className={classNames.cell(c.sortable)}
            key={c.key}
            onClick={handleSort(c.key, c.sortable)}
          >
            <Typography as={'span'} variant={'subtitle2'}>
              {c.title}
              <div className={s.iconWrapper}>
                {sort &&
                  sort.key === c.key &&
                  (sort.direction === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
              </div>
            </Typography>
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  )
}

type Column = {
  key: string
  sortable?: boolean
  title: string
}
export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

type PropsType = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>
