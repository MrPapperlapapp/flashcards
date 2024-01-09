import { useParams } from 'react-router-dom'

import clsx from 'clsx'

import s from './learn-page.module.scss'

type learnProps = {
  className?: string
}

export const LearnPage = ({ className }: learnProps) => {
  const { deckId } = useParams()
  const classNames = {
    root: clsx(s.root, className),
  }

  return <div className={classNames.root}>{deckId}</div>
}
