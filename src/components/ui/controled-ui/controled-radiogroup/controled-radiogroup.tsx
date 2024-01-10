import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radio-group/radio-group'

export const ControledRadioGroup = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: PropsType<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, disabled, name, shouldUnregister })

  return <RadioGroup onChangeValue={onChange} value={value} {...rest} />
}

type PropsType<T extends FieldValues> = Omit<UseControllerProps<T>, 'defaultValue' | 'rules'> &
  Omit<RadioGroupProps, 'onChangeValue' | 'value'>
