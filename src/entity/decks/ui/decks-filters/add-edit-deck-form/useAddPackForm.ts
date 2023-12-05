import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const packSchema = z.object({
  cover: z
    .instanceof(File)
    .refine(file => file.size <= 1000000, `Max image size is 1MB.`)
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  isPrivate: z.boolean(),
  name: z.string().nonempty('Required').min(2, 'The name must be at least 2 characters'),
})

export type PackFormType = z.infer<typeof packSchema>
export const useAddPackForm = (props: PackFormType) => {
  const { control, getFieldState, handleSubmit, resetField, setFocus, trigger, watch } = useForm({
    defaultValues: props,
    resolver: zodResolver(packSchema),
  })

  return { control, getFieldState, handleSubmit, resetField, setFocus, trigger, watch }
}
