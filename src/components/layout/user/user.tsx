import { LogOutIcon } from '@/assets/icons/log-out-icon'
import { ProfileIcon } from '@/assets/icons/profile-icon'
import { Avatar } from '@/components/ui/avatar/avatar'
import { DropDownItem, DropdownMenu } from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'

import s from './user.module.scss'

export const User = () => {
  return (
    <div className={s.user}>
      <Typography className={s.name} variant={'subtitle1'}>
        Name
      </Typography>
      <DropdownMenu
        trigger={
          <button className={s.trigger}>
            <Avatar />
          </button>
        }
      >
        <DropDownItem>
          <UserInfo />
        </DropDownItem>
        <DropDownItem>
          <ProfileIcon />
          <Typography variant={'caption'}>Profile</Typography>
        </DropDownItem>
        <DropDownItem>
          <LogOutIcon />
          <Typography variant={'caption'}>Sign out</Typography>
        </DropDownItem>
      </DropdownMenu>
    </div>
  )
}

const UserInfo = () => {
  return (
    <div className={s.user_info}>
      <Avatar />
      <div className={s.info}>
        <Typography variant={'subtitle2'}>Name</Typography>
        <Typography variant={'caption'}>j&johnson@gmail.com</Typography>
      </div>
    </div>
  )
}
