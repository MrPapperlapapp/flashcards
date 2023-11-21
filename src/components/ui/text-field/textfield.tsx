import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

import { LeftTextFieldIcon } from '@/components/ui/text-field/models/left-text-field-icon'
import { RightTextFieldIcon } from '@/components/ui/text-field/models/right-text-field-icon'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './textfield.module.scss'
export const TextField = ({
  className,
  errorMessage,
  fullWidth = false,
  label,
  onClearValue,
  onValueChange,
  type,
  value,
  ...rest
}: PurePropsType) => {
  const [showPass, setShowPass] = useState(false)

  const classNames = {
    error: clsx(s.error),
    input: clsx(s.input, type === 'search' && s.search, type === 'password' && s.pass),
    leftIcon: clsx(s.searchIcon),
    rightIcon: clsx(s.closeIcon),
    root: clsx(s.root, className),
    textFieldContainer: clsx(s.text_field_wrapper),
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
      <div className={classNames.textFieldContainer}>
        <LeftTextFieldIcon className={classNames.leftIcon} type={type} />
        <input
          className={classNames.input}
          onChange={onChangeHandler}
          type={(type === 'search' && 'text') || showPass ? 'text' : 'password'}
          value={value}
          {...rest}
        />
        <RightTextFieldIcon
          className={classNames.rightIcon}
          onClickClear={onClearValue}
          onPassShow={showPassHandler}
          showPass={showPass}
          type={type}
        />
      </div>
      {errorMessage && (
        <Typography className={classNames.error} variant={'error'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}

type PropsType = {
  errorMessage?: string
  fullWidth?: boolean
  label?: string
  onClearValue?: () => void
  onValueChange?: (val: string) => void
  type?: 'password' | 'search' | 'text'
}
type PurePropsType = PropsType & Omit<ComponentPropsWithoutRef<'input'>, keyof PropsType>
