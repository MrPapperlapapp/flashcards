import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import s from './cell.module.scss'

type cellProps = {
  className?: string
  title?: string
}

export const Cell = ({ className, title }: cellProps) => {
  const [showMore, setShowMore] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const classNames = {
    btn: s.btn,
    root: clsx(s.root, className, showMore && s.showMore),
  }

  useEffect(() => {
    if (divRef?.current?.offsetHeight && divRef?.current?.scrollHeight) {
      if (divRef?.current?.offsetHeight < divRef?.current?.scrollHeight) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }
  }, [showButton])

  return (
    <>
      <div className={classNames.root} ref={divRef}>
        {title}
      </div>
      {showButton && (
        <button className={classNames.btn} onClick={() => setShowMore(p => !p)}>
          {showMore ? 'Hide' : 'More...'}
        </button>
      )}
    </>
  )
}
