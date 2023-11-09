import { SearchIcon } from '@/assets/icons/search-icon'

export const LeftTextFieldIcon = ({ className, type = 'password' }: PropsType) => {
  switch (type) {
    case 'search': {
      return (
        <span className={className}>
          <SearchIcon />
        </span>
      )
    }
    default:
      return null
  }
}

type PropsType = {
  className: string
  type?: 'password' | 'search'
}
