import { Button, Slider, Tabs, TextField, Typography } from '@/components'

import s from './decks-filters.module.scss'

export const DecksFilters = ({
  authorId,
  name,
  setAuthorIdHandler,
  setSearchByNameHandler,
  setSliderValueHandler,
  sliderValue,
}: PropsType) => {
  return (
    <>
      <div className={s.deck_header}>
        <Typography variant={'large'}>Decks list</Typography>
        <Button variant={'primary'}>Create Deck</Button>
      </div>
      <div className={s.filters}>
        <TextField
          className={s.search}
          fullWidth
          onClearValue={() => setSearchByNameHandler('')}
          onValueChange={setSearchByNameHandler}
          type={'search'}
          value={name}
        />
        <Tabs
          label={'Show packs cards'}
          onValueChange={setAuthorIdHandler}
          tabs={[
            { title: 'My Cards', value: authorId },
            { title: 'All Cards', value: '' },
          ]}
          value={''}
        />
        <Slider
          label={'Number of cards'}
          onValueChange={setSliderValueHandler}
          slidersValue={sliderValue}
        />
        <Button variant={'secondary'}>Clear Filter</Button>
      </div>
    </>
  )
}

type PropsType = {
  authorId: string
  name: string
  setAuthorIdHandler: (id: string) => void
  setSearchByNameHandler: (name: string) => void
  setSliderValueHandler: (value: [number, number]) => void
  sliderValue: [number, number]
}
