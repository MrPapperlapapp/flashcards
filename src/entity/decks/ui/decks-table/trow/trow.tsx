import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CloseIcon } from '@/assets/icons/close-icon'
import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'
import { Modal } from '@/components'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'
import { Deck } from '@/entity/decks/api'
import { AddEditDeckForm, DeleteDeckForm } from '@/entity/decks/ui'

import s from './trow.module.scss'
import { useAppDispatch } from '@/app/store.ts'
import { setDeckId } from '@/entity/deck/model/slice/deck.slice.ts'

export const Trow = ({ data, updateDeck, deleteDeck }: PropsType) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data: me } = useGetMeQuery()
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  if (!data) {
    return null
  }
  const deleteDeckHandler = () => {
    setIsDelete(false)
    deleteDeck(data?.id)
  }
  const updateDeckHandler = (formData: FormData) => {
    setIsEdit(false)
    updateDeck(formData, data?.id)
  }
  const onClickRedirect = () => {
    dispatch(setDeckId(data?.id))
    navigate(`/${data.id}`)
  }
  return (
    <>
      <Modal onOpen={open => setIsDelete(open)} open={isDelete} title={`Delete deck`}>
        <DeleteDeckForm
          onClose={() => setIsDelete(false)}
          onSubmit={deleteDeckHandler}
          packName={data?.name || 'DeckPage name'}
        />
      </Modal>
      <Modal
        close={<CloseIcon />}
        onOpen={open => setIsEdit(open)}
        open={isEdit}
        title={'Edit DeckPage'}
      >
        <AddEditDeckForm
          defaultValues={data}
          onClose={() => setIsEdit(false)}
          onSubmit={updateDeckHandler}
        />
      </Modal>
      <tr key={data.id}>
        <td className={s.name} onClick={onClickRedirect}>
          {data.name}
        </td>
        <td className={s.cardsCount}>{data.cardsCount}</td>
        <td className={s.updated}>{data.updated}</td>
        <td className={s.createdby}>{data.author.name}</td>
        <td>
          <button className={s.icon} disabled={data.cardsCount === 0}>
            <LearnIcon />
          </button>
          <button className={s.icon} disabled={data.author.id !== me?.id}>
            <EditIcon onClick={() => setIsEdit(true)} />
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
  updateDeck: (formData: FormData, id: string) => void
  deleteDeck: (id: string) => void
}
