import { useTranslation } from 'react-i18next'

import { LogOutIcon } from '@/assets/icons/log-out-icon'
import { ProfileIcon } from '@/assets/icons/profile-icon'
import { Avatar } from '@/components/ui/avatar/avatar'
import { DropDownItem, DropdownMenu } from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'

import s from './user.module.scss'

export const User = () => {
  const { data: user } = useGetMeQuery()
  const userName = user?.name ?? 'UserName'
  const { t } = useTranslation('profile')

  return (
    <div className={s.user}>
      <Typography className={s.name} variant={'subtitle1'}>
        {userName}
      </Typography>
      <DropdownMenu
        trigger={
          <button className={s.trigger}>
            <Avatar avatar={user?.avatar} name={userName} />
          </button>
        }
      >
        <DropDownItem>
          <div className={s.user_info}>
            <Avatar avatar={user?.avatar} name={userName} />
            <div className={s.info}>
              <Typography variant={'subtitle2'}>Name</Typography>
              <Typography variant={'caption'}>j&johnson@gmail.com</Typography>
            </div>
          </div>
        </DropDownItem>
        <DropDownItem>
          <ProfileIcon />
          <Typography variant={'caption'}>{t('Profile')}</Typography>
        </DropDownItem>
        <DropDownItem>
          <LogOutIcon />
          <Typography variant={'caption'}>{t('Sign out')}</Typography>
        </DropDownItem>
      </DropdownMenu>
    </div>
  )
}
