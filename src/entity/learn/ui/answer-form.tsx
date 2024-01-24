import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button, Typography } from '@/components'
import { ControledRadioGroup } from '@/components/ui/controled-ui/controled-radiogroup/controled-radiogroup'
import clsx from 'clsx'

import s from './answer-form.module.scss'

import { memo } from 'react'
import { LoadedImg } from '@/components/ui/loaded-img/loaded-img.tsx'

type AnswerProps = {
  answer?: string
  answerImg?: string
  onNext: (data: AnswerFormData) => void
}
export type AnswerFormData = {
  grade: string
}
export const AnswerForm = memo(({ answer, answerImg, onNext }: AnswerProps) => {
  const { t } = useTranslation('answer')
  const classNames = {
    root: clsx(s.root),
  }
  const OPTIONS = [
    {
      label: t('Did not know'),
      value: '1',
    },
    {
      label: t('Forgot'),
      value: '2',
    },
    {
      label: t('A lot of thought'),
      value: '3',
    },
    {
      label: t('Confused'),
      value: '4',
    },
    {
      label: t('Knew the answer'),
      value: '5',
    },
  ]
  const { control, handleSubmit } = useForm({ defaultValues: { grade: '2' } })
  return (
    <form className={classNames.root} onSubmit={handleSubmit(onNext)}>
      <div className={'answer'}>
        <Typography variant={'subtitle1'}>{t('Answer')}: </Typography>
        {answer && <Typography variant={'subtitle1'}>{answer}</Typography>}
        {answerImg && (
          <LoadedImg src={answerImg} alt={'Answer Image'} className={s.answerImg} lazy />
        )}
      </div>
      <ControledRadioGroup
        control={control}
        name={'grade'}
        options={OPTIONS}
        title={t('Rate youself')}
        className={s.radio__group}
      />
      <div className={s.button}>
        <Button fullWidth variant={'primary'}>
          {t('Next Question')}
        </Button>
      </div>
    </form>
  )
})
