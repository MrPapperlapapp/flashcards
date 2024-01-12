import { Typography } from '@/components'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

export type RadioGroupProps = {
  onChangeValue: (value: string) => void
  options: RadioGroupItemProps[]
  title?: string
  value: string
}

export const RadioGroup = ({ onChangeValue, options, title, value }: RadioGroupProps) => {
  return (
    <RadixRadioGroup.Root
      aria-label={'View density'}
      className={s.root}
      onValueChange={onChangeValue}
      value={value}
    >
      {title && <Typography variant={'subtitle1'}>{title}</Typography>}
      {options.map((o, idx) => (
        <RadioGroupItem key={idx} label={o.label} value={o.value} />
      ))}
    </RadixRadioGroup.Root>
  )
}

const RadioGroupItem = ({ label, value }: RadioGroupItemProps) => {
  return (
    <div className={s.item__container}>
      <label className={s.label} htmlFor={value}>
        <div className={s.item__wrapper}>
          <RadixRadioGroup.Item className={s.item} id={value} value={value}>
            <RadixRadioGroup.Indicator className={s.item__indicator} />
          </RadixRadioGroup.Item>
        </div>

        {label}
      </label>
    </div>
  )
}

type RadioGroupItemProps = {
  label: string
  value: string
}
