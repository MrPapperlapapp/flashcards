import { Button, Typography } from '@/components'

import s from './delte-deck-form.module.scss'

export const DeleteDeckForm = ({ onClose, onSubmit, packName }: PropsType) => {
  return (
    <div className={s.container}>
      <Typography variant={'body1'}>
        Do you really want to remove <b>{packName}</b>?
      </Typography>
      <Typography variant={'body1'}>All cards will be deleted.</Typography>
      <div className={s.buttons_group}>
        <Button onClick={onClose} variant={'secondary'}>
          Close
        </Button>
        <Button onClick={onSubmit} variant={'primary'}>
          Delete
        </Button>
      </div>
    </div>
  )
}

type PropsType = {
  onClose: () => void
  onSubmit: () => void
  packName: string
}
