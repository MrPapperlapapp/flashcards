import { CheckBoxIcon } from '@/assets/icons/checkbox-icon'
import { UnCheckBoxIcon } from '@/assets/icons/uncheckbox-icon'
import { Typography } from '@/components/ui/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'
export const Checkbox = ({
  checked,
  className,
  disabled,
  label,
  onChangeChecked,
}: CheckBoxType) => {
  const classNames = {
    container: clsx(s.container),
    icon_wrapper: clsx(s.icon_wrapper),
    indicator: clsx(s.CheckboxIndicator),
    label: clsx(s.Label),
    root: clsx(s.CheckboxRoot, className),
  }

  return (
    <div className={classNames.container}>
      <RadixCheckbox.Root
        className={classNames.root}
        defaultChecked
        disabled={disabled}
        id={'c1'}
        onCheckedChange={onChangeChecked}
      >
        <RadixCheckbox.Indicator asChild className={classNames.indicator} forceMount>
          <div className={classNames.icon_wrapper}>
            {checked ? <CheckBoxIcon /> : <UnCheckBoxIcon />}{' '}
          </div>
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Typography as={'label'} className={classNames.label} htmlFor={'c1'} variant={'body2'}>
          {label}
        </Typography>
      )}
    </div>
  )
}

export type CheckBoxType = {
  checked?: boolean
  className?: string
  disabled?: boolean
  label?: string
  onChangeChecked?: (checked: boolean) => void
}
