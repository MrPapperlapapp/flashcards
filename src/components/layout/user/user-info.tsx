import { LearnIcon } from '@/assets/icons/learn-icon'
import { Avatar } from '@/components/ui/avatar/avatar'
import { DropdownMenu, Options } from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'

import s from './user-info.module.scss'

export const UserInfo = () => {
  return (
    <div className={s.user}>
      <Typography className={s.name} variant={'subtitle1'}>
        Name
      </Typography>
      <DropdownMenu
        options={options}
        trigger={
          <button>
            <Avatar />
          </button>
        }
      />
    </div>
  )
}
const options: Options[] = [
  { icon: <LearnIcon />, title: 'Learn JS' },
  { icon: <LearnIcon />, title: 'Learn TS' },
  { icon: <LearnIcon />, title: 'Learn HTML' },
  { icon: <LearnIcon />, title: 'Learn CSS' },
]
