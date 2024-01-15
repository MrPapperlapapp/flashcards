import { useTranslation } from 'react-i18next'

import { LangType, changeLang } from '@/app/app.slice'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { LogOutIcon } from '@/assets/icons/log-out-icon'
import { ProfileIcon } from '@/assets/icons/profile-icon'
import { Select } from '@/components'
import { Avatar } from '@/components/ui/avatar/avatar'
import { DropDownItem, DropdownMenu } from '@/components/ui/dropdown-menu'
import { Typography } from '@/components/ui/typography'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'

import s from './user.module.scss'

export const User = () => {
  const lang = useAppSelector(state => state.app.lang)
  const dispatch = useAppDispatch()
  const { data: user } = useGetMeQuery()
  const userName = user?.name ?? 'UserName'
  const { i18n, t } = useTranslation('profile')

  const changeLangHandler = async (lang: string) => {
    // changeLanguage(lang).then(() => dispatch(changeLang(lang as LangType)))
    await i18n.changeLanguage(lang).then(() => dispatch(changeLang(lang as LangType)))
  }

  return (
    <div className={s.user}>
      <Select onValueChange={changeLangHandler} options={Options} value={lang} />
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

const Options = [
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Русский', value: 'ru' },
]
