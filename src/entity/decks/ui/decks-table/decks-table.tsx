import { ReactNode } from 'react'

import { Deck, useDeleteDeckMutation, useUpdateDeckMutation } from '@/entity/decks/api'
import { Trow } from '@/entity/decks/ui/decks-table/trow'

import s from './decks-table.module.scss'
import { setCurrentPage } from '@/entity/decks/models'
import { useAppDispatch } from '@/app/store.ts'
import { Loading } from '@/components'

export const DecksTable = ({ children, data, isLoading }: PropsType) => {
  const dispatch = useAppDispatch()
  const [deleteDeck, { isLoading: isLoadingDeleteDeck }] = useDeleteDeckMutation()
  const [updateDeck, { isLoading: isLoadingUpdateDeck }] = useUpdateDeckMutation()
  const isLoadingData = isLoading || isLoadingUpdateDeck || isLoadingDeleteDeck
  const updateDeckHandler = (formData: FormData, id: string) => {
    const name = formData.get('name')?.toString()
    const isPrivate = !!formData.get('isPrivate')?.toString()
    const cover = formData.get('cover') as Blob

    updateDeck({ cover, id, isPrivate, name: name })
    dispatch(setCurrentPage(1))
  }

  const deleteDeckHandler = (id: string) => deleteDeck({ id })
  return (
    <>
      <table className={s.table}>
        {children}
        <tbody className={s.tbody}>
          {isLoadingData ? (
            <tr>
              <td colSpan={5}>
                <Loading />
              </td>
            </tr>
          ) : (
            data?.map(e => (
              <Trow
                data={e}
                key={e.id}
                updateDeck={updateDeckHandler}
                deleteDeck={deleteDeckHandler}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

type PropsType = {
  children: ReactNode
  data?: Deck[]
  isLoading: boolean
}
