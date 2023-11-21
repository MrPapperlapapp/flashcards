import { CSSProperties } from 'react'

import * as RadixAvatar from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

export const Avatar = ({ avatar, name, size = 36 }: PropsType) => {
  const styles: CSSProperties = {
    height: size,
    width: size,
  }

  return (
    <RadixAvatar.Root className={s.container}>
      <RadixAvatar.Image alt={'avatar icon'} className={s.avatar} src={avatar} style={styles} />
      <RadixAvatar.Fallback className={s.fallback} delayMs={600} style={styles}>
        {name[0].toUpperCase()}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}

type PropsType = {
  avatar?: string
  name: string
  size?: number
}
