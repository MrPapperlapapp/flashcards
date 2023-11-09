import { Ref, SVGProps, forwardRef, memo } from 'react'

const ClosedEyeIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={20}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'm2.999 3 18 18M9.843 9.914a3 3 0 0 0 4.265 4.22M6.5 6.646A10.024 10.024 0 0 0 2.457 12c1.274 4.057 5.065 7 9.542 7 1.99 0 3.842-.58 5.4-1.582m-6.4-12.369c.329-.032.663-.049 1-.049 4.478 0 8.268 2.943 9.542 7a9.954 9.954 0 0 1-1.189 2.5'
      }
      stroke={'#FFF'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={2}
    />
  </svg>
)
const ForwardRef = forwardRef(ClosedEyeIcon)
const Memo = memo(ForwardRef)

export { Memo as ClosedEyeIcon }
