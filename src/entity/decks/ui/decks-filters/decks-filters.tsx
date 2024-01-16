import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { CloseIcon } from '@/assets/icons/close-icon'
import { Button, Modal, Slider, Tabs, TabsType, TextField, Typography } from '@/components'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'
import { useCreateDecksMutation } from '@/entity/decks/api'
import {
  getMaxCardsCount,
  setAuthorId,
  setSearchByName,
  setSliderValue,
} from '@/entity/decks/models'
import { AddEditDeckForm } from '@/entity/decks/ui'

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

  console.log(maxCardsCount)
  const { data } = useGetMeQuery()
  const [createDeck] = useCreateDecksMutation()
  const userId = data?.id || ''

  const { t } = useTranslation('decks')

  const dispatch = useAppDispatch()

  const cardsCount = useAppSelector(getMaxCardsCount)
  const onSubmit = (data: FormData) => {
    createDeck(data)
    setOpenModal(false)
  }

  const tabs: TabsType[] = [
    { title: t('My cards'), value: userId },
    { title: t('All cards'), value: '' },
  ]
  const onClickClearFilters = () => {
    dispatch(setSearchByName(''))
    dispatch(setSliderValue([0, maxCardsCount || 1]))
    dispatch(setAuthorId(''))
  }

  return (
    <>
      <Modal
        close={<CloseIcon />}
        onOpen={open => setOpenModal(open)}
        open={openModal}
        title={'Create DeckPage'}
      >
        <AddEditDeckForm onClose={() => setOpenModal(false)} onSubmit={onSubmit} />
      </Modal>
      <div className={s.deck_header}>
        <Typography variant={'large'}>Decks list</Typography>
        <Button onClick={() => setOpenModal(true)} variant={'primary'}>
          {t('Create Deck')}
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
          label={t('Show packs cards')}
          onValueChange={setAuthorIdHandler}
          tabs={tabs}
          value={authorId}
        />
        <Slider
          label={t('Number of cards')}
          max={cardsCount}
          onValueChange={setSliderValueHandler}
          slidersValue={[sliderValue?.[0] || 0, sliderValue?.[1] || maxCardsCount || 1]}
        />
        <Button onClick={onClickClearFilters} variant={'secondary'}>
          {t('Clear Filter')}
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
  sliderValue: [number, number] | undefined
}
