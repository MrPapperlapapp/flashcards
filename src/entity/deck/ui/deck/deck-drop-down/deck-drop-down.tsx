import { useTranslation } from 'react-i18next'

import { DeleteIcon } from '@/assets/icons/delete-icon'
import { EditIcon } from '@/assets/icons/edit-icon'
import { LearnIcon } from '@/assets/icons/learn-icon'
import { SettingsIcon } from '@/assets/icons/settings-icom'
import { DropDownItem, DropdownMenu, Typography } from '@/components'
import { Deck } from '@/entity/decks/api'
import { clsx } from 'clsx'

import s from './deck-drop-down.module.scss'

type DeckDropDownProps = {
  className?: string
  deck?: Deck
  setIsEditCard: () => void
}

export const DeckDropDown = ({ className, deck, setIsEditCard }: DeckDropDownProps) => {
  const { t } = useTranslation('deck')
  const classNames = {
    icon: s.icon,
    root: clsx(s.root, className),
  }

  return (
    <div className={classNames.root}>
      <Typography variant={'large'}>{deck?.name}</Typography>
      {!!deck?.cardsCount && (
        <DropdownMenu
          trigger={
            <button className={classNames.icon}>
              <SettingsIcon />
            </button>
          }
        >
          <DropDownItem>
            <LearnIcon />
            <Typography variant={'caption'}>{t('Learn')}</Typography>
          </DropDownItem>
          <DropDownItem onClick={setIsEditCard}>
            <EditIcon />
            <Typography variant={'caption'}>{t('Edit')}</Typography>
          </DropDownItem>
          <DropDownItem>
            <DeleteIcon />
            <Typography variant={'caption'}>{t('Delete')}</Typography>
          </DropDownItem>
        </DropdownMenu>
      )}
    </div>
  )
}
