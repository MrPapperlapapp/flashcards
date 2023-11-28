import { useState } from 'react'

import cover from '@/assets/icons/no-cover.svg'
import { Button, Typography } from '@/components'
import { ControledCheckbox } from '@/components/ui/controled-ui/controled-checkbox/controled-checkbox'
import { ControledFileuploader } from '@/components/ui/controled-ui/controled-fileuploader/controled-fileuploader'
import { ControledTextfield } from '@/components/ui/controled-ui/controled-textfield/controled-textfield'
import { Deck } from '@/entity/decks/api/decks.types'
import {
  PackFormType,
  useAddPackForm,
} from '@/entity/decks/ui/decks-filters/add-edit-deck-form/useAddPackForm'

import s from './add-edit-deck-form.module.scss'

export const AddEditDeckForm = ({ defaultValues, onClose, onSubmit }: PropsType) => {
  const [downloaded, setDownloaded] = useState<string>(defaultValues?.cover || '')
  const [coverError, setCoverError] = useState('')

  const values: PackFormType = {
    isPrivate: defaultValues?.isPrivate || false,
    name: defaultValues?.name || '',
  }

  const { control, getFieldState, handleSubmit, resetField, trigger, watch } =
    useAddPackForm(values)

  const fileIsDirty = getFieldState('cover').isDirty

  const extraActions = async () => {
    const success = await trigger('cover')

    const { error } = getFieldState('cover')

    const file = watch('cover')

    if (!success && error?.message) {
      setCoverError(error.message)
      resetField('cover')
    }

    if (file) {
      const badCase = defaultValues?.cover ? defaultValues.cover : ''
      const img = success ? URL.createObjectURL(file) : badCase

      setDownloaded(img)
      if (coverError) {
        setCoverError('')
      }
    }
  }

  const sendHandler = (data: PackFormType) => {
    const form = new FormData()

    form.append('name', `${data.name}`)
    form.append('isPrivate', `${data.isPrivate}`)
    fileIsDirty && form.append('cover', data.cover || '')
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit(sendHandler)}>
      <div className={s.container}>
        <div className={s.cover}>
          <img alt={'img'} src={downloaded || cover} />
        </div>
        {coverError && (
          <Typography className={s.error} variant={'caption'}>
            {coverError}
          </Typography>
        )}
        <ControledFileuploader
          className={s.change_cover}
          control={control}
          extraActions={extraActions}
          name={'cover'}
        >
          Change Cover
        </ControledFileuploader>
        <ControledTextfield
          autoFocus={!!defaultValues?.name}
          control={control}
          label={'Deck name'}
          name={'name'}
          placeholder={'name'}
          type={'text'}
        />
        <ControledCheckbox control={control} label={'is Private?'} name={'isPrivate'} />
        <div className={s.bottom}>
          <Button onClick={onClose} variant={'secondary'}>
            Cancel
          </Button>
          <Button variant={'primary'}>Save</Button>
        </div>
      </div>
    </form>
  )
}

type PropsType = {
  defaultValues?: DefValueType
  onClose: () => void
  onSubmit: (data: FormData) => void
}

type DefValueType = {
  cover?: null | string
} & Pick<Deck, 'isPrivate' | 'name'>
