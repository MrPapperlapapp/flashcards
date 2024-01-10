import { Button, Typography } from '@/components'
import { RadioGroup } from '@/components/ui/radio-group/radio-group'
import clsx from 'clsx'

import s from './answer-form.module.scss'

type AnswerProps = {
  answer?: string
  onNext: () => void
}

export const AnswerForm = ({ answer }: AnswerProps) => {
  const classNames = {
    root: clsx(s.root),
  }

  return (
    <div className={classNames.root}>
      <Typography variant={'subtitle1'}>{`Answer: ${answer}`}</Typography>
      <RadioGroup onChangeValue={() => {}} options={OPTIONS} value={OPTIONS[0].value} />
      <Button fullWidth variant={'primary'}>
        Next Question
      </Button>
    </div>
  )
}

const OPTIONS = [
  {
    label: 'Did not know',
    value: '1',
  },
  {
    label: 'Forgot',
    value: '2',
  },
  {
    label: 'A lot of thought',
    value: '3',
  },
  {
    label: 'Confused',
    value: '4',
  },
  {
    label: 'Knew the answer',
    value: '5',
  },
]
