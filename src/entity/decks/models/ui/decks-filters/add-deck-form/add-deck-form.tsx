import { useForm } from 'react-hook-form'

import cover from '@/assets/icons/no-cover.svg'
import { Button, Typography } from '@/components'
import { ControledCheckbox } from '@/components/ui/controled-ui/controled-checkbox/controled-checkbox'
import { ControledTextfield } from '@/components/ui/controled-ui/controled-textfield/controled-textfield'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-deck-form.module.scss'

const addDeckSchema = z.object({
  isPrivate: z.boolean().optional(),
  name: z.string().min(3).max(30),
})

export type addDeckFieldsType = z.infer<typeof addDeckSchema>
export const AddDeckForm = ({ onClose, onSubmit }: PropsType) => {
  const { control, handleSubmit } = useForm<addDeckFieldsType>({
    defaultValues: {
      isPrivate: false,
      name: '',
    },
    resolver: zodResolver(addDeckSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.container}>
        <Typography variant={'h2'}>Add new deck</Typography>
        <div>
          <img alt={'img'} src={cover} />
        </div>

        <Button fullWidth variant={'secondary'}>
          Change cover
        </Button>
        <ControledTextfield
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
  onClose: () => void
  onSubmit: (data: addDeckFieldsType) => void
}
