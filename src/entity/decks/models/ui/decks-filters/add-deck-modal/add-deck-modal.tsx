import { CloseIcon } from '@/assets/icons/close-icon'
import { Button, Checkbox, TextField } from '@/components'
import { Modal } from '@/components/ui/modal/modal'

import s from './add-deck-modal.module.scss'

import cover from '../../../../../../assets/icons/no-cover.svg'

export const AddDeckModal = () => {
  return (
    <Modal
      close={<CloseIcon />}
      title={'Add new Deck'}
      trigger={<Button variant={'primary'}>Create Deck</Button>}
    >
      <div className={s.container}>
        <div>
          <img alt={'img'} src={cover} />
        </div>
        <Button fullWidth variant={'secondary'}>
          Change cover
        </Button>
        <TextField label={'Deck name'} placeholder={'Name'} type={'text'} />
        <Checkbox checked label={'is Private?'} onChangeChecked={() => {}} />

        <div className={s.bottom}>
          <Button variant={'secondary'}>Cancel</Button>
          <Button variant={'primary'}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}
