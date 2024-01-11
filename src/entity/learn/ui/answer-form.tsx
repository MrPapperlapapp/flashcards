import { useForm } from 'react-hook-form'

import { Button, Typography } from '@/components'
import { ControledRadioGroup } from '@/components/ui/controled-ui/controled-radiogroup/controled-radiogroup'
import clsx from 'clsx'

import s from './answer-form.module.scss'

type AnswerProps = {
  answer?: string
  answerImg?: string
  onNext: (data: AnswerFormData) => void
}
export type AnswerFormData = {
  grade: string
}
export const AnswerForm = ({ answer, answerImg, onNext }: AnswerProps) => {
  const classNames = {
    root: clsx(s.root),
  }
  const { control, handleSubmit } = useForm({ defaultValues: { grade: '2' } })

  return (
    <form className={classNames.root} onSubmit={handleSubmit(onNext)}>
      <div className={'answer'}>
        <Typography variant={'subtitle1'}>Answer: </Typography>
        {answer && <Typography variant={'subtitle1'}>{answer}</Typography>}
        {answerImg && (
          <div className={s.answerImg}>
            <img alt={'Answer Image'} src={answerImg} />
          </div>
        )}
      </div>
      <ControledRadioGroup
        control={control}
        name={'grade'}
        options={OPTIONS}
        title={'Rate you self'}
      />
      <Button fullWidth variant={'primary'}>
        Next Question
      </Button>
    </form>
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
