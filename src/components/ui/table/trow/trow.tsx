import { useState } from 'react'

import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'
import { Modal } from '@/components/ui/modal/modal'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'
import { useDeleteDeckMutation } from '@/entity/decks/api/decks.api'
import { Deck } from '@/entity/decks/api/decks.types'
import { DeleteDeckForm } from '@/entity/decks/ui/decks-filters/delete-deck-form/delete-deck-form'

import s from './trow.module.scss'

export const Trow = ({ data }: PropsType) => {
  const { data: me } = useGetMeQuery()
  const [deleteDeck] = useDeleteDeckMutation()
  const [isDelete, setIsDelete] = useState(false)

  if (!data) {
    return null
  }
  const deleteDeckHandler = () => {
    setIsDelete(false)
    deleteDeck({ id: data?.id })
  }

  return (
    <>
      <Modal onOpen={open => setIsDelete(open)} open={isDelete} title={`Delete deck`}>
        <DeleteDeckForm
          onClose={() => setIsDelete(false)}
          onSubmit={deleteDeckHandler}
          packName={data?.name || 'Deck name'}
        />
      </Modal>
      <tr className={s.tr_body} key={data.id}>
        <td>{data.name}</td>
        <td>{data.cardsCount}</td>
        <td>{data.updated}</td>
        <td>{data.author.name}</td>
        <td>
          <button className={s.icon} disabled={data.cardsCount === 0}>
            <LearnIcon />
          </button>
          <button className={s.icon} disabled={data.author.id !== me?.id}>
            <EditIcon />
          </button>
          <button className={s.icon} disabled={data.author.id !== me?.id}>
            <DeleteIcon onClick={() => setIsDelete(true)} />
          </button>
        </td>
      </tr>
    </>
  )
}

type PropsType = {
  data?: Deck
}
