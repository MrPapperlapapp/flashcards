import { LogoIcon } from '@/assets/icons/logo-icon'
import { User } from '@/components/layout/user/user'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'

export const Header = () => {
  const data = true

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Typography as={'a'} className={s.logo} href={'#'}>
          <LogoIcon />
        </Typography>
        <div>{data ? <User /> : <Button variant={'primary'}>LogIn</Button>}</div>
      </div>
    </header>
  )
}
