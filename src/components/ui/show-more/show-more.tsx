import { useMemo, useState } from 'react'

import s from './show-more.module.scss'
export const ShowMore = ({ value }: PropsType) => {
  const [showMore, setShowMore] = useState(true)

  const text = useMemo(() => {
    return showMore ? value.slice(0, 56) : value
  }, [value, showMore])

  if (value.length < 56) {
    return <p className={s.text}>{text}</p>
  }

  return (
    <p className={s.text}>
      {text}
      <button className={s.button} onClick={() => setShowMore(p => !p)}>
        {showMore ? '...' : '<'}
      </button>
    </p>
  )
}

type PropsType = {
  value: string
}
