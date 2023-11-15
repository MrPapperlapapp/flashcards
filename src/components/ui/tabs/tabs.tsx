import { ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export const Tabs = ({ children, onValueChange, tabs, value }: TabsPropsType) => {
  return (
    <RadixTabs.Root className={s.root} onValueChange={onValueChange} value={value}>
      <RadixTabs.List className={s.list}>
        {tabs?.map((t, i) => (
          <RadixTabs.Trigger className={s.trigger} disabled={t.disabled} key={i} value={t.value}>
            <Typography variant={'body1'}>{t.title}</Typography>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  )
}

export const TabContent = ({ children, value }: TabContentPropsType) => {
  return <RadixTabs.Content value={value}>{children}</RadixTabs.Content>
}

type TabsType = {
  disabled?: boolean
  title: string
  value: string
}
type TabsPropsType = {
  children: ReactNode
  defaultTab?: string
  onValueChange: (value: string) => void
  tabs: TabsType[]
  value: string
}
type TabContentPropsType = {
  children: ReactNode
  value: string
}
