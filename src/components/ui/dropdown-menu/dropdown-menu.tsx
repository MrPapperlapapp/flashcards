import { ReactNode } from 'react'

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'

export const DropdownMenu = ({ children, trigger }: DropdownMenuPropsType) => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content align={'end'} className={s.DropdownMenuContent} sideOffset={4}>
          <RadixDropdownMenu.Arrow asChild className={s.DropdownMenuArrow}>
            <i className={s.arrowUp} />
          </RadixDropdownMenu.Arrow>
          <div className={s.Items}>{children}</div>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}

export const DropDownItem = ({ children }: DropdownItemPropsType) => {
  return <RadixDropdownMenu.Item className={s.DropdownMenuItem}>{children}</RadixDropdownMenu.Item>
}

export type Options = {
  icon: ReactNode
  title: string
}

type DropdownMenuPropsType = {
  children: ReactNode
  trigger: ReactNode
}
type DropdownItemPropsType = {
  children: ReactNode
}
