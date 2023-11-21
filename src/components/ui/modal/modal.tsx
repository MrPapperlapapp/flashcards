import { ReactNode } from 'react'

import { Typography } from '@/components'
import { Cards } from '@/components/ui/cards/cards'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'
export const Modal = ({ children, close, title, trigger }: PropsType) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className={s.content}>
          <Cards as={'div'}>
            <Dialog.Title className={s.title}>
              <Typography variant={'h2'}>{title}</Typography>
            </Dialog.Title>
            <Dialog.Description className={s.description}>{children}</Dialog.Description>
            <Dialog.Close asChild className={s.close}>
              <button>{close}</button>
            </Dialog.Close>
          </Cards>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type PropsType = {
  children: ReactNode
  close?: ReactNode
  title: string
  trigger: ReactNode
}
