import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './cards.module.scss'

type PropsType<T extends 'div' | 'section'> = {
  as: T
  children: ReactNode
}

type PurePropsType<T extends 'div' | 'section'> = PropsType<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PropsType<T>>

export const Cards = <T extends 'div' | 'section'>(props: PurePropsType<T>) => {
  const { as: Component = 'div', children, className, ...rest } = props
  const classNames = clsx(s.component, className)

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  )
}
