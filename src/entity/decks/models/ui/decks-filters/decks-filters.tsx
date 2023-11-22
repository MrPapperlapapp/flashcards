import { useState } from 'react'

import { useAppDispatch } from '@/app/store'
import { CloseIcon } from '@/assets/icons/close-icon'
import { Button, Slider, Tabs, TabsType, TextField, Typography } from '@/components'
import { Modal } from '@/components/ui/modal/modal'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'
import {
  setAuthorId,
  setSearchByName,
  setSliderValue,
} from '@/entity/decks/models/slice/decks.slice'
import {
  AddDeckForm,
  addDeckFieldsType,
} from '@/entity/decks/models/ui/decks-filters/add-deck-form'

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
  const [openModal, setOpenModal] = useState(false)

  const { data } = useGetMeQuery()

  const userId = data?.id || ''

  const dispatch = useAppDispatch()

  const onSubmit = (data: addDeckFieldsType) => {
    console.log(data)
    setOpenModal(false)
  }

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
      <Modal close={<CloseIcon />} onOpen={open => setOpenModal(open)} open={openModal}>
        <AddDeckForm onSubmit={onSubmit} />
      </Modal>
      <div className={s.deck_header}>
        <Typography variant={'large'}>Decks list</Typography>
        <Button onClick={() => setOpenModal(true)} variant={'primary'}>
          Create Deck
        </Button>
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
