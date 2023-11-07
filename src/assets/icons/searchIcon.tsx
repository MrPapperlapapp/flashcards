import { ComponentPropsWithoutRef, FC } from 'react'

type IconProps = {
  className: string
} & ComponentPropsWithoutRef<'svg'>

export const Search: FC<IconProps> = ({ className, ...rest }) => {
  return (
    <svg
      className={className}
      fill={'none'}
      height={20}
      viewBox={'0 0 24 24'}
      width={20}
      xmlns={'http://www.w3.org/2000/svg'}
      {...rest}
    >
      <path
        d={'M14.954 14.946 21 21m-4-11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'}
        stroke={'gray'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={2}
      />
    </svg>
  )
}
