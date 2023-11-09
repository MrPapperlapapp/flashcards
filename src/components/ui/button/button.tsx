import { ElementType, PropsWithoutRef } from 'react'

export const Button = () => {
  return <div></div>
}

type PropsType<T extends ElementType = 'button'> = {
  as: T
  variant: 'primary' | 'secondary'
}

type PurePropsType<T extends ElementType> = PropsType<T> &
  Omit<PropsWithoutRef<T>, keyof PropsType<T>>
