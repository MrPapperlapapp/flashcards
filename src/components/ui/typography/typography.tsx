import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'
export const Typography = <T extends ElementType = 'span'>({
  as,
  children,
  className,
  variant = 'body1',
  ...rest
}: PureProps<T>) => {
  const Component = as || COMPONENTS[variant] || 'span'

  const style = clsx(s[variant], className)

  return (
    <Component className={style} {...rest}>
      {children}
    </Component>
  )
}

type PropsType<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  className?: string
  variant?: keyof typeof COMPONENTS
}
type PureProps<T extends ElementType> = PropsType<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PropsType<T>>

const COMPONENTS = {
  body1: 'p',
  body2: 'p',
  caption: 'span',
  error: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  large: 'h1',
  link1: 'a',
  link2: 'a',
  overline: 'p',
  subtitle1: 'p',
  subtitle2: 'p',
} as const
