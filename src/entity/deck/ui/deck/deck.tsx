import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { CloseIcon } from '@/assets/icons/close-icon'
import { Button, Modal, TextField, Thead, Typography } from '@/components'
import { useGetCardsQuery, useGetDeckQuery } from '@/entity/deck/api/deck.api'
import { DeckDropDown } from '@/entity/deck/ui/deck/deck-drop-down/deck-drop-down'
import { DeckTable } from '@/entity/deck/ui/deck/deck-table/deck-table'
import { AddEditDeckForm } from '@/entity/decks/ui'

import s from './deck.module.scss'

export const Deck = () => {
  const [isEditCard, setIsEditCard] = useState(false)
  const { deckId } = useParams()
  const navigate = useNavigate()
  const { data: deck } = useGetDeckQuery({ id: deckId ?? '0' })
  const { data: cards } = useGetCardsQuery({ id: deckId ?? '0' })
  const { t } = useTranslation('deck')

  const columns = [
    {
      key: 'question',
      sortable: true,
      title: t('Question'),
    },
    {
      key: 'answer',
      title: t('Answer'),
    },
    {
      key: 'updated',
      title: t('Last Updated'),
    },
    {
      key: 'grade',
      title: t('Grade'),
    },
  ]

  return (
    <>
      <Modal
        close={<CloseIcon />}
        onOpen={() => setIsEditCard(p => !p)}
        open={isEditCard}
        title={'Edit Card'}
      >
        <AddEditDeckForm
          defaultValues={deck}
          onClose={() => setIsEditCard(false)}
          onSubmit={() => {}}
        />
      </Modal>
      <div className={s.header}>
        <DeckDropDown deck={deck} setIsEditCard={() => setIsEditCard(true)} />
        {!!cards?.items.length && (
          <Button onClick={() => navigate(`/${deckId}/learn`)} variant={'primary'}>
            {t('Learn to Pack')}
          </Button>
        )}
      </div>
      {!cards?.items.length && (
        <div className={s.no_cards}>
          <Typography variant={'body1'}>{t('Empty Pack')}</Typography>
          <Button variant={'primary'}>{t('Create Card')}</Button>
        </div>
      )}
      {!!cards?.items.length && (
        <>
          <TextField type={'search'} />
          <DeckTable data={cards?.items}>
            <Thead columns={columns} />
          </DeckTable>
        </>
      )}
    </>
  )
}
