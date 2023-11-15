import { useCallback, useMemo } from 'react'

import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './paginantion.module.scss'

export const Pagination = ({
  countPerPage,
  currentPage,
  onChangeCurrentPage,
  totalCount,
}: PropsType) => {
  const {
    changeCurrentPageHandler,
    isFirstPage,
    isLastPage,
    nextPageHandler,
    prevPageHandler,
    range,
  } = usePagination(totalCount, currentPage, countPerPage, onChangeCurrentPage)

  const classNames = {
    container: clsx(s.container),
    item: (selected: boolean = false) => clsx(s.item, selected && s.current),
    nextPrevButtons: s.nextPrevButtons,
  }

  return (
    <div className={classNames.container}>
      <button
        className={classNames.nextPrevButtons}
        disabled={isFirstPage}
        onClick={prevPageHandler}
      >
        {'<'}
      </button>

      {range?.map((p, i) => (
        <button
          className={classNames.item(currentPage === p)}
          disabled={typeof p === 'string'}
          key={i}
          onClick={() => changeCurrentPageHandler(p as number)}
        >
          <Typography variant={'body2'}>{p}</Typography>
        </button>
      ))}

      <button
        className={classNames.nextPrevButtons}
        disabled={isLastPage}
        onClick={nextPageHandler}
      >
        {'>'}
      </button>
    </div>
  )
}

const usePagination = (
  totalCount: number,
  currentPage: number,
  countPerPage: number,
  onChange: (page: number) => void
) => {
  const totalPages = Math.floor(totalCount / countPerPage)
  const DOTS = '...'
  const pages = (start: number, end: number) => {
    const length = end - start + 1

    return Array.from({ length }, (_, idx) => start + idx)
  }
  const range = useMemo(() => {
    /* 1 case < 7 items ( 2x Dots + 3 items + 2 start / end) */
    if (totalPages <= 7) {
      return pages(1, 7)
    }

    const leftSibling = Math.max(currentPage - 1, 1) // 1
    const rightSibling = Math.min(currentPage + 1, totalPages) // 2

    const shouldShowLeftSibling = leftSibling > 2 //false
    const shouldShowRigthSibling = rightSibling < totalPages - 2

    if (shouldShowLeftSibling && !shouldShowRigthSibling) {
      const rigthRange = pages(totalPages - 4, totalPages)

      return [1, DOTS, ...rigthRange]
    }
    if (shouldShowRigthSibling && !shouldShowLeftSibling) {
      const leftRange = pages(1, 5)

      return [...leftRange, DOTS, totalPages]
    }
    if (shouldShowRigthSibling && shouldShowLeftSibling) {
      const middleRange = pages(currentPage - 1, currentPage + 1)

      return [1, DOTS, ...middleRange, DOTS, totalPages]
    }
  }, [currentPage, totalPages, countPerPage])

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const changeCurrentPageHandler = useCallback(
    (page: number) => onChange(page),
    [currentPage, onChange]
  )
  const nextPageHandler = useCallback(() => onChange(currentPage + 1), [currentPage, onChange])
  const prevPageHandler = useCallback(() => onChange(currentPage - 1), [currentPage, onChange])

  return {
    changeCurrentPageHandler,
    isFirstPage,
    isLastPage,
    nextPageHandler,
    prevPageHandler,
    range,
  }
}

type PropsType = {
  countPerPage: number
  currentPage: number
  onChangeCurrentPage: (value: number) => void
  totalCount: number
}
