import { useMemo, useState } from 'react'

export const ShowMore = ({ value }: PropsType) => {
  const [showMore, setShowMore] = useState(true)

  const text = useMemo(() => {
    return showMore ? value.slice(0, 30) + '...' : value
  }, [value, showMore])

  if (value.length < 30) {
    return <p>{text}</p>
  }

  return (
    <>
      <p>
        {text} <button onClick={() => setShowMore(p => !p)}>{showMore ? 'More...' : 'Hide'}</button>
      </p>
    </>
  )
}

type PropsType = {
  value: string
}
