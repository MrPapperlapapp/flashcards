import { Button, Slider, Tabs, TextField, Typography } from '@/components'
import { Table } from '@/components/ui/table'

import s from './decks.module.scss'

export const Decks = () => {
  return (
    <>
      <div className={s.deck_header}>
        <Typography variant={'large'}>Decks list</Typography>
        <Button variant={'primary'}>Create Deck</Button>
      </div>
      <div className={s.filters}>
        <TextField className={s.search} fullWidth type={'search'} />
        <Tabs
          onValueChange={() => {}}
          tabs={[
            { title: 'My Cards', value: 'id' },
            { title: 'All Cards', value: '' },
          ]}
          value={''}
        />
        <Slider onValueChange={() => {}} slidersValue={[0, 100]} />
        <Button variant={'secondary'}>Clear Filter</Button>
      </div>
      <Table columns={columns} />
    </>
  )
}

const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]
