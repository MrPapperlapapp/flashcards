import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBoxType, Checkbox } from '@/components'

export const ControledCheckbox = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, disabled, name, shouldUnregister })

  return <Checkbox checked={value} onChangeChecked={onChange} {...rest} />
}

type PropsType<T extends FieldValues> = Omit<UseControllerProps<T>, 'defaultValue' | 'rules'> &
  CheckBoxType
