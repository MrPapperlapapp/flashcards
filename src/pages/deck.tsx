import { useParams } from 'react-router-dom'

import { Button, TextField, Thead, Typography } from '@/components'
import { useGetCardsQuery } from '@/entity/deck/api/deck.api'
import { DeckTable } from '@/entity/deck/ui/deck-table/deck-table'

import s from './deck.module.scss'

export const Deck = () => {
  const { deckId } = useParams()

  const { data: cards } = useGetCardsQuery({ id: deckId ?? '0' })

  if (!deckId) {
    return <div>Error</div>
  }

  return (
    <div className={s.container}>
      <Typography variant={'body2'}>Back to Decks</Typography>{' '}
      <div className={s.header}>
        <Typography variant={'large'}>Pack Name : {deckId}</Typography>
        {!!cards?.items.length && <Button variant={'primary'}> Learn to Pack</Button>}
      </div>
      {!cards?.items.length && (
        <div className={s.no_cards}>
          <Typography variant={'body1'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button variant={'primary'}>Create Card</Button>
        </div>
      )}
      {cards?.items.length && (
        <>
          <TextField type={'search'} />
          <DeckTable data={cards?.items}>
            <Thead columns={columns} />
          </DeckTable>
        </>
      )}
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
