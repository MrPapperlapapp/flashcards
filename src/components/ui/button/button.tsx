import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './button.module.scss'

export const Button = <T extends ElementType = 'button'>(props: ButtonPropsType<T>) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    icon,
    variant = 'primary',
    ...rest
  } = props

  const classNames = clsx(s[variant], fullWidth && s.fullWidth, className)

  return (
    <Component className={classNames} {...rest}>
      {icon && icon}
      {children && <Typography variant={'subtitle2'}>{children}</Typography>}
    </Component>
  )
}

type PropsType<T extends ElementType> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  variant?: 'icon' | 'link' | 'primary' | 'secondary' | 'tertiary'
}

export type ButtonPropsType<T extends ElementType = 'button'> = PropsType<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PropsType<T>>
