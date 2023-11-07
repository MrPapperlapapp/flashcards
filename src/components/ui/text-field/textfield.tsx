import { ChangeEvent, ComponentPropsWithoutRef } from 'react'

import { Close } from '@/assets/icons/closeIcon'
import { Search } from '@/assets/icons/searchIcon'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './textfield.module.scss'
export const TextField = ({
  className,
  fullWidth = false,
  label,
  onClearValue,
  onValueChange,
  type,
  value,
  variant,
  ...rest
}: PropsType) => {
  const classNames = {
    input: clsx(s.input, variant === 'search' && s.search, fullWidth && s.fullWidth),
    root: clsx(s.root, className),
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.currentTarget.value)
  }

  return (
    <div className={classNames.root}>
      {label && (
        <Typography as={'label'} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.text_field_wrapper}>
        {variant === 'search' && <Search className={s.searchIcon} />}
        <input
          className={classNames.input}
          onChange={onChangeHandler}
          type={'text'}
          value={value}
          {...rest}
        />
        {onClearValue && (
          <button className={s.closeIcon} disabled={!value} onClick={onClearValue}>
            <Close />
          </button>
        )}
      </div>
    </div>
  )
}

type PropsType = {
  fullWidth?: boolean
  label?: string
  onClearValue?: () => void
  onValueChange?: (val: string) => void
  variant?: 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>
