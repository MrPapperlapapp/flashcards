import { useParams } from 'react-router-dom'

import { Button, Table, TextField, Thead, Typography } from '@/components'

import s from './deck.module.scss'
export const Deck = () => {
  const { deckId } = useParams()

  return (
    <div className={s.container}>
      <Typography variant={'body2'}>Back to Decks</Typography>{' '}
      <div className={s.header}>
        <Typography variant={'large'}>Pack Name : {deckId}</Typography>
        <Button variant={'primary'}> Learn to Pack</Button>
      </div>
      <TextField type={'search'} />
      <Table>
        <Thead columns={columns} />
      </Table>
    </div>
  )
}

const columns = [
  {
    key: 'question',
    sortable: true,
    title: 'Question',
  },
  {
    key: 'answer',
    title: 'Answer',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'grade',
    title: 'Grade',
  },
]
