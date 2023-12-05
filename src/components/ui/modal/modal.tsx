import { ReactNode } from 'react'

import { Typography } from '@/components'
import { Cards } from '@/components/ui/cards/cards'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

export const Modal = ({ children, close, onOpen, open, title, trigger }: PropsType) => {
  return (
    <Dialog.Root onOpenChange={onOpen} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Trigger>{trigger}</Dialog.Trigger>
        <Dialog.Content
          className={s.content}
          forceMount
          onOpenAutoFocus={event => event.preventDefault()}
        >
          <Cards as={'div'}>
            <Typography className={s.title} variant={'h2'}>
              {title}
            </Typography>
            {children}
            {close && (
              <Dialog.Close asChild className={s.close}>
                <button>{close}</button>
              </Dialog.Close>
            )}
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
  title: string
  trigger?: ReactNode
}
