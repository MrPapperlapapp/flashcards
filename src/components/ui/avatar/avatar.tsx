import s from './avatar.module.scss'

import img from '../../../assets/icons/avatar.svg'
export const Avatar = () => {
  return (
    <div className={s.container}>
      <img alt={'avatar'} src={img} />
    </div>
  )
}
