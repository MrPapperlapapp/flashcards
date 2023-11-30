import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CloseIcon } from '@/assets/icons/close-icon'
import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'
import { Modal } from '@/components'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'
import { Deck, useDeleteDeckMutation, useUpdateDeckMutation } from '@/entity/decks/api'
import { AddEditDeckForm, DeleteDeckForm } from '@/entity/decks/ui'

import s from './trow.module.scss'

export const Trow = ({ data }: PropsType) => {
  const navigate = useNavigate()
  const { data: me } = useGetMeQuery()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  if (!data) {
    return null
  }
  const deleteDeckHandler = () => {
    setIsDelete(false)
    deleteDeck({ id: data?.id })
  }
  const updateDeckHandler = (formData: FormData) => {
    setIsEdit(false)
    const name = formData.get('name')?.toString()
    const isPrivate = !!formData.get('isPrivate')?.toString()
    const cover = formData.get('cover') as Blob

    updateDeck({ cover, id: data?.id, isPrivate, name: name })
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
      <Modal
        close={<CloseIcon />}
        onOpen={open => setIsEdit(open)}
        open={isEdit}
        title={'Edit Deck'}
      >
        <AddEditDeckForm
          defaultValues={data}
          onClose={() => setIsEdit(false)}
          onSubmit={updateDeckHandler}
        />
      </Modal>
      <tr key={data.id}>
        <td className={s.name} onClick={() => navigate(`/${data.id}`)}>
          {data.name}
        </td>
        <td>{data.cardsCount}</td>
        <td>{data.updated}</td>
        <td>{data.author.name}</td>
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
}
