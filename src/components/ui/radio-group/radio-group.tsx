import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio-group.module.scss'

type RadioGroupProps = {
  onChangeValue: (value: string) => void
  options: RadioGroupItemProps[]
  value: string
}

export const RadioGroup = ({ onChangeValue, options, value }: RadioGroupProps) => {
  return (
    <form>
      <RadixRadioGroup.Root
        aria-label={'View density'}
        className={s.root}
        onValueChange={onChangeValue}
        value={value}
      >
        {options.map((o, idx) => (
          <RadioGroupItem key={idx} label={o.label} value={o.value} />
        ))}
      </RadixRadioGroup.Root>
    </form>
  )
}

const RadioGroupItem = ({ label, value }: RadioGroupItemProps) => {
  return (
    <div className={s.item__container}>
      <div className={s.item__wrapper}>
        <RadixRadioGroup.Item className={s.item} value={value}>
          <RadixRadioGroup.Indicator className={s.item__indicator} />
        </RadixRadioGroup.Item>
      </div>
      <label className={s.label} htmlFor={'r1'}>
        {label}
      </label>
    </div>
  )
}

type RadioGroupItemProps = {
  label: string
  value: string
}
