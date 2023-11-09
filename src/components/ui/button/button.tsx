import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './button.module.scss'

export const Button = <T extends ElementType = 'button'>(props: PurePropsType<T>) => {
  const {
    as: Component = 'button',
    children,
    className,
    icon,
    variant = 'primary',
    ...rest
  } = props

  const classNames = clsx(s[variant], className)

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
  icon?: ReactNode
  variant?: 'icon' | 'link' | 'primary' | 'secondary' | 'tertiary'
}

type PurePropsType<T extends ElementType = 'button'> = PropsType<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PropsType<T>>
