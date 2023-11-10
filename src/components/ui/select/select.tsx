import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { ChevronDownIcon } from '@/assets/icons/chevron-down-icon'
import { ChevronUpIcon } from '@/assets/icons/chevron-up-icon'
import { Typography } from '@/components/ui/typography'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

export const Select = ({ disabled, onValueChange, options, value }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <RadixSelect.Root
      disabled={disabled}
      onOpenChange={() => setIsOpen(p => !p)}
      onValueChange={onValueChange}
      open={isOpen}
      value={value}
    >
      <RadixSelect.Trigger aria-label={'Food'} className={s.SelectTrigger} value={value}>
        <Typography variant={'body1'}>
          <RadixSelect.Value />
        </Typography>
        <RadixSelect.Icon>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={s.SelectContent} position={'popper'}>
          <RadixSelect.ScrollUpButton className={s.SelectScrollButton}>
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className={s.SelectViewport}>
            <RadixSelect.Group>
              {options?.map((o, idx) => (
                <SelectItem key={idx} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </RadixSelect.Group>
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={s.SelectScrollButton}>
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

const SelectItem = forwardRef<
  ElementRef<typeof RadixSelect.Item>,
  ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, className, ...props }, forwardedRef) => {
  const classNames = {
    item: clsx(s.SelectItem, className),
  }

  return (
    <RadixSelect.Item className={classNames.item} {...props} ref={forwardedRef}>
      <RadixSelect.ItemText>
        <Typography variant={'body1'}> {children}</Typography>
      </RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={s.SelectItemIndicator}>
        <ChevronDownIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
})

type PropsType = {
  disabled?: boolean
  onValueChange: (value: string) => void
  options: Options[]
  value: string
}

type Options = {
  label: string
  value: string
}
