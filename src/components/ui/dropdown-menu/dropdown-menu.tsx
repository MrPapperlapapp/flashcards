import { ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'

export const DropdownMenu = ({ options, trigger }: PropsType) => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content className={s.DropdownMenuContent} sideOffset={8}>
          <RadixDropdownMenu.Arrow asChild className={s.DropdownMenuArrow}>
            <i className={s.arrowUp} />
          </RadixDropdownMenu.Arrow>
          <div className={s.Items}>
            {options.map((e, i) => (
              <RadixDropdownMenu.Item className={s.DropdownMenuItem} key={i}>
                {e.icon}
                <Typography variant={'caption'}>{e.title}</Typography>
              </RadixDropdownMenu.Item>
            ))}
          </div>
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}

export type Options = {
  icon: ReactNode
  title: string
}

type PropsType = {
  options: Options[]
  trigger: ReactNode
}
