import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography/typography'

const meta = {
  component: Typography,
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant={'large'}>Large</Typography>
      <Typography variant={'h1'}>H1</Typography>
      <Typography variant={'h2'}>H2</Typography>
      <Typography variant={'h3'}>H3</Typography>
      <Typography variant={'body1'}>Body 1</Typography>
      <Typography variant={'subtitle1'}>Subtitle 1</Typography>
      <Typography variant={'body2'}>Body 2</Typography>
      <Typography variant={'subtitle2'}>Subtitle 2</Typography>
      <Typography variant={'caption'}>Caption</Typography>
      <Typography variant={'overline'}>Overline</Typography>
      <Typography variant={'link1'}>Link 1</Typography>
      <Typography variant={'link2'}>Link 2</Typography>
    </div>
  ),
}
export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'large',
  },
}
export const H1: Story = {
  args: {
    children: 'H1',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    children: 'H2',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: 'H3',
    variant: 'h3',
  },
}

export const Body1: Story = {
  args: {
    children: 'Body 1',
    variant: 'body1',
  },
}

export const Subtitle1: Story = {
  args: {
    children: 'Subtitle 1',
    variant: 'subtitle1',
  },
}

export const Body2: Story = {
  args: {
    children: 'Body 2',
    variant: 'body2',
  },
}

export const Subtitle2: Story = {
  args: {
    children: 'Subtitle 2',
    variant: 'subtitle2',
  },
}
