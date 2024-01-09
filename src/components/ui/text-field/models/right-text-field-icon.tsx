import { CloseIcon } from '@/assets/icons/close-icon'
import { ClosedEyeIcon } from '@/assets/icons/closed-eye-icon'
import { OpenedEyeIcon } from '@/assets/icons/opened-eye-icon'

export const RightTextFieldIcon = ({
  className,
  onClickClear,
  onPassShow,
  showPass = false,
  type = 'password',
  value,
}: PropsType) => {
  switch (type) {
    case 'password': {
      return (
        <button className={className} onClick={onPassShow}>
          {showPass ? <OpenedEyeIcon /> : <ClosedEyeIcon />}
        </button>
      )
    }
    case 'search': {
      return (
        <button className={className} onClick={onClickClear}>
          {!!value && <CloseIcon />}
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
  type?: 'file' | 'password' | 'search' | 'text'
  value: boolean
}
