import { useNavigate } from 'react-router-dom'

import { LogoIcon } from '@/assets/icons/logo-icon'
import { User } from '@/components/layout/header/user/user'
import { Button } from '@/components/ui/button'
import { UserType } from '@/entity/auth/api/auth.api'

import s from './header.module.scss'

export const Header = ({ data }: PropsType) => {
  const navigate = useNavigate()

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Button as={'a'} className={s.logo} onClick={() => navigate('/')} variant={'icon'}>
          <LogoIcon />
        </Button>
        <div>{data ? <User /> : <Button variant={'primary'}>LogIn</Button>}</div>
      </div>
    </header>
  )
}

type PropsType = {
  data?: UserType
}
