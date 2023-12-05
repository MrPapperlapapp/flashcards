import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { CloseIcon } from '@/assets/icons/close-icon'
import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'
import { SettingsIcon } from '@/assets/icons/settings-icom'
import {
  Button,
  DropDownItem,
  DropdownMenu,
  Loading,
  Modal,
  TextField,
  Thead,
  Typography,
} from '@/components'
import { useGetCardsQuery, useGetDeckQuery } from '@/entity/deck/api/deck.api'
import { DeckTable } from '@/entity/deck/ui/deck-table/deck-table'
import { AddEditDeckForm } from '@/entity/decks/ui'

import s from './deck.module.scss'

export const Deck = () => {
  const [isEditCard, setIsEditCard] = useState(false)
  const { deckId } = useParams()
  const navigate = useNavigate()
  const { data: deck, isLoading: isDeckLoading } = useGetDeckQuery({ id: deckId ?? '0' })
  const { data: cards, isLoading: isCardsLoading } = useGetCardsQuery({ id: deckId ?? '0' })

  if (!deckId) {
    return <div>Error</div>
  }
  if (isCardsLoading || isDeckLoading) {
    console.log('deckLoading')

    return <Loading />
  }

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
      <div className={s.container}>
        <button onClick={() => navigate(-1)}>
          <Typography variant={'body2'}>Back to Decks</Typography>
        </button>

        <div className={s.header}>
          <div className={s.header_menu}>
            <Typography variant={'large'}>{deck?.name}</Typography>
            <DropdownMenu
              trigger={
                <button className={s.icon}>
                  <SettingsIcon />
                </button>
              }
            >
              <DropDownItem>
                <LearnIcon />
                <Typography variant={'caption'}>Learn</Typography>
              </DropDownItem>
              <DropDownItem onClick={() => setIsEditCard(true)}>
                <EditIcon />
                <Typography variant={'caption'}>Edit</Typography>
              </DropDownItem>
              <DropDownItem>
                <DeleteIcon />
                <Typography variant={'caption'}>Delete</Typography>
              </DropDownItem>
            </DropdownMenu>
          </div>
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
        {!!cards?.items.length && (
          <>
            <TextField type={'search'} />
            <DeckTable data={cards?.items}>
              <Thead columns={columns} />
            </DeckTable>
          </>
        )}
      </div>
    </>
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
