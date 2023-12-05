import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const cardSchema = z.object({
  answer: z.string().nonempty('Required').min(2, 'The name must be at least 2 characters'),
  answerImg: z
    .instanceof(File)
    .refine(file => file.size <= 1000000, `Max image size is 1MB.`)
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  question: z.string().nonempty('Required').min(2, 'The name must be at least 2 characters'),
  questionImg: z
    .instanceof(File)
    .refine(file => file.size <= 1000000, `Max image size is 1MB.`)
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
})

export type CardFormType = z.infer<typeof cardSchema>
export const UseAddEditCardForm = (props: CardFormType) => {
  const { control, getFieldState, handleSubmit, resetField, trigger, watch } = useForm({
    defaultValues: props,
    resolver: zodResolver(cardSchema),
  })

  return { control, getFieldState, handleSubmit, resetField, trigger, watch }
}
