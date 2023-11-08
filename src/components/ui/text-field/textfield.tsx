import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import { LeftTextFieldIcon } from '@/components/ui/text-field/models/left-text-field-icon'
import { RightTextFieldIcon } from '@/components/ui/text-field/models/right-text-field-icon'
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
  const [showPass, setShowPass] = useState(false)

  const classNames = {
    input: clsx(s.input, variant === 'search' && s.search, variant === 'password' && s.pass),
    root: clsx(s.root, className),
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.currentTarget.value)
  }
  const showPassHandler = () => setShowPass(p => !p)

  return (
    <div className={classNames.root}>
      {label && (
        <Typography as={'label'} variant={'body2'}>
          {label}
        </Typography>
      )}
      <div className={s.text_field_wrapper}>
        <LeftTextFieldIcon className={s.searchIcon} type={variant} />
        <input
          className={classNames.input}
          onChange={onChangeHandler}
          type={(variant === 'search' && 'text') || showPass ? 'text' : 'password'}
          value={value}
          {...rest}
        />
        <RightTextFieldIcon
          className={s.closeIcon}
          onClickClear={onClearValue}
          onPassShow={showPassHandler}
          showPass={showPass}
          type={variant}
        />
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
