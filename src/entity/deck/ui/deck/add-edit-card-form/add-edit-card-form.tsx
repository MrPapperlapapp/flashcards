import { useState } from 'react'

import cover from '@/assets/icons/no-cover.svg'
import { Button, Select, Typography } from '@/components'
import { ControledFileuploader } from '@/components/ui/controled-ui/controled-fileuploader/controled-fileuploader.tsx'
import { ControledTextfield } from '@/components/ui/controled-ui/controled-textfield/controled-textfield.tsx'
import { Cards, EditCardsParams } from '@/entity/deck/api/deck.types.ts'
import {
  CardFormType,
  UseAddEditCardForm,
} from '@/entity/deck/ui/deck/add-edit-card-form/useAddEditCardForm.ts'

import s from './add-edit-card-form.module.scss'

export const AddEditCardForm = ({ defaultValue, onSubmit }: PropsType) => {
  const [selectVal, setSelectVal] = useState('text')
  const [answerImgError, setAnswerImgError] = useState<string | undefined>(undefined)
  const [questionImgError, setQuestionImgError] = useState<string | undefined>(undefined)
  const [answerImg, setAnswerImg] = useState<string | undefined>(defaultValue?.answerImg)
  const [questionImg, setQuestionImg] = useState<string | undefined>(defaultValue?.questionImg)
  const values: CardFormType = {
    answer: defaultValue?.answer || '',
    question: defaultValue?.question || '',
  }
  const { control, getFieldState, handleSubmit, resetField, trigger, watch } =
    UseAddEditCardForm(values)

  const extraActionsAnswerImg = async () => {
    const success = await trigger('answerImg')

    const { error } = getFieldState('answerImg')

    const file = watch('answerImg')

    if (!success && error?.message) {
      setAnswerImgError(error.message)
      resetField('answerImg')
    }

    if (file) {
      const badCase = defaultValue?.answerImg ?? ''
      const img = success ? URL.createObjectURL(file) : badCase

      setAnswerImg(img)
      if (answerImgError) {
        setAnswerImgError(undefined)
      }
    }
  }
  const extraActionsQuestionImg = async () => {
    const success = await trigger('questionImg')

    const { error } = getFieldState('questionImg')

    const file = watch('questionImg')

    if (!success && error?.message) {
      setQuestionImgError(error.message)
      resetField('questionImg')
    }

    if (file) {
      const badCase = defaultValue?.answerImg ?? ''
      const img = success ? URL.createObjectURL(file) : badCase

      setQuestionImg(img)
      if (questionImgError) {
        setQuestionImgError(undefined)
      }
    }
  }
  const submitHandler = (data: DataValue) => {
    const { answer, answerImg, question, questionImg } = data

    onSubmit({ answer, answerImg, question, questionImg })
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={s.container}>
        <div className={s.select_wrapper}>
          <Select
            label={'Choose a question format'}
            onValueChange={value => setSelectVal(value)}
            options={OPTIONS}
            value={selectVal}
          />
        </div>
        {selectVal === 'text' && (
          <>
            <ControledTextfield
              control={control}
              label={'Question'}
              name={'question'}
              type={'text'}
            />
            <ControledTextfield control={control} label={'Answer'} name={'answer'} type={'text'} />
          </>
        )}
        {selectVal === 'picture' && (
          <>
            <div className={s.cover_wrapper}>
              <div className={s.cover}>
                <img alt={'img'} src={answerImg || cover} />
              </div>
              {answerImgError && (
                <Typography className={s.error} variant={'caption'}>
                  {answerImgError}
                </Typography>
              )}
              <ControledFileuploader
                className={s.change_cover}
                control={control}
                extraActions={extraActionsAnswerImg}
                name={'answerImg'}
              >
                Change Answer Image
              </ControledFileuploader>
            </div>
            <div className={s.cover_wrapper}>
              <div className={s.cover}>
                <img alt={'img'} src={questionImg || cover} />
              </div>
              {questionImgError && (
                <Typography className={s.error} variant={'caption'}>
                  {questionImgError}
                </Typography>
              )}
              <ControledFileuploader
                className={s.change_cover}
                control={control}
                extraActions={extraActionsQuestionImg}
                name={'questionImg'}
              >
                Change Question Image
              </ControledFileuploader>
            </div>
          </>
        )}
        <div className={s.btn_group}>
          <Button type={'button'} variant={'secondary'}>
            Cancel
          </Button>
          <Button variant={'primary'}>Add Card</Button>
        </div>
      </div>
    </form>
  )
}

const OPTIONS = [
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Picture',
    value: 'picture',
  },
]

type DefaultValue = Pick<Cards, 'answer' | 'answerImg' | 'question' | 'questionImg'>
export type DataValue = Omit<EditCardsParams, 'deckId' | 'id'>
type PropsType = {
  defaultValue?: DefaultValue
  onSubmit: (data: DataValue) => void
}
