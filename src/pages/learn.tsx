import { useParams } from 'react-router-dom'

import clsx from 'clsx'

import s from './learn.module.scss'

type learnProps = {
  className?: string
}

export const Learn = ({ className }: learnProps) => {
  const { deckId } = useParams()
  const classNames = {
    root: clsx(s.root, className),
  }

  return <div className={classNames.root}>{deckId}</div>
}
