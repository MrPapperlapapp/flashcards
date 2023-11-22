import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldType } from '@/components'

export const ControledTextfield = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  })

  return <TextField onChange={onChange} value={value} {...rest} />
}

type PropsType<T extends FieldValues> = Omit<UseControllerProps<T>, 'defaultValue' | 'rules'> &
  TextFieldType
