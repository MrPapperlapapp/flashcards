import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={16}
    ref={ref}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M11.707 14a.666.666 0 0 1-.307-.073L8 12.147l-3.4 1.78a.666.666 0 0 1-.967-.707L4.3 9.467 1.553 6.8a.667.667 0 0 1-.166-.667.667.667 0 0 1 .54-.453l3.8-.553L7.4 1.707a.667.667 0 0 1 1.2 0l1.693 3.413 3.8.553a.666.666 0 0 1 .54.454.667.667 0 0 1-.166.666L11.72 9.46l.667 3.753a.666.666 0 0 1-.267.667.667.667 0 0 1-.413.12Z'
      }
      fill={'CurrentColor'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)
const Memo = memo(ForwardRef)

export { Memo as GradeIcon }
