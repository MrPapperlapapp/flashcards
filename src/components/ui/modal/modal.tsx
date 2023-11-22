import { ReactNode } from 'react'

import { Cards } from '@/components/ui/cards/cards'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'
export const Modal = ({ children, close, onOpen, open }: PropsType) => {
  return (
    <Dialog.Root onOpenChange={onOpen} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className={s.content}>
          <Cards as={'div'}>
            {children}
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
  onOpen: (open: boolean) => void
  open?: boolean
}
