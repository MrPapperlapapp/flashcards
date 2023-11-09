import type { Meta } from '@storybook/react'

import { LogOutIcon } from '@/assets/icons/log-out-icon'
import { Button } from '@/components/ui/button/button'

export default {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} as Meta<typeof Button>

export const Primary = {
  args: {
    children: 'Primary',
    disabled: false,
    fullWidth: false,
    variant: 'primary',
  },
}

export const PrimaryWithIcon = {
  args: {
    children: 'Primary with icon',
    disabled: false,
    fullWidth: false,
    icon: <LogOutIcon />,
    variant: 'primary',
  },
}
