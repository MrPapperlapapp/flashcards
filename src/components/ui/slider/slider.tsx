import { Typography } from '@/components/ui/typography'
import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'

export const Slider = ({
  label,
  max = 100,
  min = 1,
  minStepsBetweenThumbs = 1,
  onValueChange,
  slidersValue,
  step = 1,
}: PropsType) => {
  console.log(slidersValue)

  return (
    <div className={s.container}>
      {label && <Typography variant={'body2'}>{label}</Typography>}
      <div className={s.wrapper}>
        <Typography className={s.values} variant={'body1'}>
          {slidersValue[0]}
        </Typography>
        <RadixSlider.Root
          className={s.root}
          max={max}
          min={min}
          minStepsBetweenThumbs={minStepsBetweenThumbs}
          onValueChange={onValueChange}
          step={step}
          value={slidersValue}
        >
          <RadixSlider.Track className={s.track}>
            <RadixSlider.Range className={s.range} />
          </RadixSlider.Track>
          <RadixSlider.Thumb aria-label={'Volume'} className={s.thumb} />
          <RadixSlider.Thumb aria-label={'Volume'} className={s.thumb} />
        </RadixSlider.Root>
        <Typography className={s.values} variant={'body1'}>
          {slidersValue[1]}
        </Typography>
      </div>
    </div>
  )
}

type PropsType = {
  label?: string
  max?: number
  min?: number
  minStepsBetweenThumbs?: number
  onValueChange: (slidersValue: [number, number]) => void
  slidersValue: [number, number]
  step?: number
}
