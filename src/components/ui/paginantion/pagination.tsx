import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@/components'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './paginantion.module.scss'

export const Pagination = ({
  countPerPage,
  currentPage,
  onChangeCurrentPage,
  onChangeItemsPerPage,
  totalCount,
}: PropsType) => {
  const { t } = useTranslation()
  const onClickChangeItemsPerPageHandler = (num: string) => {
    onChangeItemsPerPage?.(num)
  }

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
  if (currentPage > totalCount / countPerPage) return <div></div>
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
      <div className={s.select_wrapper}>
        <Typography variant={'body2'}>{t('Show')}</Typography>
        <Select
          onValueChange={onClickChangeItemsPerPageHandler}
          options={options}
          value={`${countPerPage}`}
        />
        <Typography variant={'body2'}>{t('per Page')}</Typography>
      </div>
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
      return pages(1, totalPages)
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
  }, [currentPage, totalPages])

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const changeCurrentPageHandler = useCallback((page: number) => onChange(page), [onChange])
  const nextPageHandler = useCallback(() => onChange(currentPage + 1), [currentPage, onChange])
  const prevPageHandler = useCallback(() => onChange(currentPage - 1), [currentPage, onChange])

  if (!range?.length) {
    range?.push(1)
  }
  return {
    changeCurrentPageHandler,
    isFirstPage,
    isLastPage,
    nextPageHandler,
    prevPageHandler,
    range,
  }
}

const options = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
]

type PropsType = {
  countPerPage: number
  currentPage: number
  onChangeCurrentPage: (value: number) => void
  totalCount: number
  onChangeItemsPerPage?: (value: string) => void
}
