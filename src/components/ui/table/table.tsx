import { ReactNode, useState } from 'react'

import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'
import { Modal } from '@/components/ui/modal/modal'
import { Deck } from '@/entity/decks/api/decks.types'
import { DeleteDeckForm } from '@/entity/decks/ui/decks-filters/delete-deck-form/delete-deck-form'

import s from './table.module.scss'

export const Table = ({ children, data }: PropsType) => {
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)
  const [isDelete, setIsDelete] = useState(false)
  const deleteDeckHandler = (deck: Deck) => {
    if (deck) {
      setCurrentDeck(deck)
      setIsDelete(true)
    }
  }

  return (
    <>
      <Modal onOpen={open => setIsDelete(open)} open={isDelete} title={`Delete deck`}>
        <DeleteDeckForm onSubmit={() => {}} packName={currentDeck?.name || 'Deck name'} />
      </Modal>
      <table className={s.table}>
        {children}
        <tbody className={s.tbody}>
          {data?.map(item => (
            <tr className={s.tr_body} key={item.id}>
              <td>{item.name}</td>
              <td>{item.cardsCount}</td>
              <td>{item.updated}</td>
              <td>{item.author.name}</td>
              <td>
                <LearnIcon />
                <EditIcon />
                <DeleteIcon onClick={() => deleteDeckHandler(item)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data && <div className={s.empty_line}>Empty</div>}
    </>
  )
}

type PropsType = {
  children: ReactNode
  data?: Deck[]
}
