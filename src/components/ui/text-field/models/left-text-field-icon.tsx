import { Search } from '@/assets/icons/searchIcon'

export const LeftTextFieldIcon = ({ className, type = 'password' }: PropsType) => {
  switch (type) {
    case 'search': {
      return (
        <span className={className}>
          <Search />
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
