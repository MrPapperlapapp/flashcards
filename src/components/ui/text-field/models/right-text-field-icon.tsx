import { ClosedEye } from '@/assets/icons/closeEyeIcon'
import { Close } from '@/assets/icons/closeIcon'
import { OpenedEye } from '@/assets/icons/openEyeIcon'

export const RightTextFieldIcon = ({
  className,
  onClickClear,
  onPassShow,
  showPass = false,
  type = 'password',
}: PropsType) => {
  switch (type) {
    case 'password': {
      return (
        <button className={className} onClick={onPassShow}>
          {showPass ? <OpenedEye /> : <ClosedEye />}
        </button>
      )
    }
    case 'search': {
      return (
        <button className={className} onClick={onClickClear}>
          <Close />
        </button>
      )
    }
    default:
      return null
  }
}

type PropsType = {
  className: string
  onClickClear?: () => void
  onPassShow?: () => void
  showPass?: boolean
  type?: 'password' | 'search'
}
