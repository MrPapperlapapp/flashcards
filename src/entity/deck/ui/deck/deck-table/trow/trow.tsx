import { useState } from 'react'

import { CloseIcon } from '@/assets/icons/close-icon'
import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { Button, Modal } from '@/components'
import { Grade } from '@/components/ui/grade/grade'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'
import { useEditCardMutation, useEditGradeMutation } from '@/entity/deck/api/deck.api'
import { Cards } from '@/entity/deck/api/deck.types'
import {
  AddEditCardForm,
  DataValue,
} from '@/entity/deck/ui/deck/add-edit-card-form/add-edit-card-form'

import s from './trow.module.scss'

export const Trow = ({ data }: PropsType) => {
  const [isEditCards, setIsEditCard] = useState(false)
  const { data: me } = useGetMeQuery()
  const [editGrade] = useEditGradeMutation()
  const [editCard] = useEditCardMutation()

  if (!data) {
    return null
  }
  const onEditGrade = (grade: number) => editGrade({ cardId: data.id, deckId: data.deckId, grade })
  const onEditCard = ({ answer, answerImg, question, questionImg }: DataValue) => {
    editCard({ answer, answerImg, deckId: data.deckId, id: data.id, question, questionImg })
    setIsEditCard(false)
  }

  return (
    <>
      <Modal
        close={<CloseIcon />}
        onOpen={() => setIsEditCard(p => !p)}
        open={isEditCards}
        title={'Edit Card'}
      >
        <AddEditCardForm defaultValue={data} onSubmit={onEditCard} />
      </Modal>
      <tr>
        <td>{data?.question}</td>
        <td>{data?.answer}</td>
        <td>{data?.updated}</td>
        <td>
          <Grade grade={data?.grade} onEditGrade={onEditGrade} />
        </td>
        <td>
          {me?.id === data.userId && (
            <div className={s.button_container}>
              <Button disabled={me?.id !== data.userId} variant={'icon'}>
                <DeleteIcon />
              </Button>
              <Button
                disabled={me?.id !== data.userId}
                onClick={() => setIsEditCard(true)}
                variant={'icon'}
              >
                <EditIcon />
              </Button>
            </div>
          )}
        </td>
      </tr>
    </>
  )
}

type PropsType = {
  data?: Cards
}
