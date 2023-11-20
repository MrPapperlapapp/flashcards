import { useAppDispatch } from '@/app/store.ts'
import { Button, Slider, Tabs, TabsType, TextField, Typography } from '@/components'
import { useGetMeQuery } from '@/entity/auth/api/auth.api.ts'
import {
  setAuthorId,
  setSearchByName,
  setSliderValue,
} from '@/entity/decks/models/slice/decks.slice.ts'

import s from './decks-filters.module.scss'

export const DecksFilters = ({
  authorId,
  maxCardsCount,
  name,
  setAuthorIdHandler,
  setSearchByNameHandler,
  setSliderValueHandler,
  sliderValue,
}: PropsType) => {
  const { data } = useGetMeQuery()

  const userId = data?.id || ''

  const dispatch = useAppDispatch()
  const tabs: TabsType[] = [
    { title: 'My cards', value: userId },
    { title: 'All cards', value: '' },
  ]
  const onClickClearFilters = () => {
    dispatch(setSearchByName(''))
    dispatch(setSliderValue([0, maxCardsCount || 1]))
    dispatch(setAuthorId(''))
  }

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
          tabs={tabs}
          value={authorId}
        />
        <Slider
          label={'Number of cards'}
          max={maxCardsCount || 100}
          onValueChange={setSliderValueHandler}
          slidersValue={[sliderValue?.[0] || 0, sliderValue?.[1] || maxCardsCount || 1]}
        />
        <Button onClick={onClickClearFilters} variant={'secondary'}>
          Clear Filter
        </Button>
      </div>
    </>
  )
}

type PropsType = {
  authorId: string
  maxCardsCount?: number
  name: string
  setAuthorIdHandler: (id: string) => void
  setSearchByNameHandler: (name: string) => void
  setSliderValueHandler: (value: [number, number]) => void
  sliderValue: [number, number]
}
