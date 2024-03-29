import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext, useParams } from 'react-router-dom'

import { Button, Loading, Typography } from '@/components'
import { Cards } from '@/components/ui/cards/cards'
import { ScrollBar } from '@/components/ui/scroll-bar/scroll-bar'
import { useEditGradeMutation, useGetQuestionQuery } from '@/entity/learn/api/learn.api'
import { AnswerForm, AnswerFormData } from '@/entity/learn/ui/answer-form'
import clsx from 'clsx'

import s from './learn-page.module.scss'
import { LoadedImg } from '@/components/ui/loaded-img/loaded-img'

type learnProps = {
  className?: string
}

export const LearnPage = ({ className }: learnProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('learn')
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const { deckId } = useParams()
  const { title } = useOutletContext<{ title: string | undefined }>()
  const {
    data: questionData,
    isFetching: isFetchingGetQuestion,
    isLoading: isQuestionLoading,
  } = useGetQuestionQuery({
    id: deckId,
  })
  const [editGrade, { isLoading: isLoadingEditGrade, data }] = useEditGradeMutation()
  const question = data ?? questionData
  const classNames = {
    attempts: s.attempts,
    cards: s.cards,
    question: s.question,
    questionImg: s.questionImg,
    root: clsx(s.root, className),
    text: s.text,
    title: s.title,
  }
  const onClickShowAnswer = useCallback(() => {
    setIsShowAnswer(true)
  }, [])

  const onClickShowNextQuestion = (data: AnswerFormData) => {
    editGrade({ cardId: question?.id!, deckId: deckId!, grade: +data.grade }).finally(() =>
      setIsShowAnswer(false)
    )
  }

  const isLoading = isLoadingEditGrade || isFetchingGetQuestion || isQuestionLoading
  // const isLoading = true

  if (isLoading) {
    return (
      <div className={classNames.root}>
        <Cards as={'div'} className={classNames.cards} style={{ height: '260px' }}>
          <Loading />
        </Cards>
      </div>
    )
  }
  return (
    <div className={classNames.root}>
      <ScrollBar maxHeight={'600px'} type={'always'}>
        <div ref={divRef}>
          <Cards as={'div'} className={classNames.cards}>
            <Typography className={classNames.title} variant={'large'}>
              {`${t('Learn')} "${title}"`}
            </Typography>
            <div className={classNames.text}>
              <Typography className={classNames.question} variant={'subtitle1'}>
                {`${t('Question')}: ${question?.question}`}
              </Typography>
              {question?.questionImg && (
                <LoadedImg
                  src={question?.questionImg}
                  alt={'Question Image'}
                  className={classNames.questionImg}
                />
              )}
              <Typography className={classNames.attempts} variant={'subtitle2'}>
                {`${t('Count of attempts')}: 10`}
              </Typography>
            </div>
            {isShowAnswer ? (
              <AnswerForm
                answer={question?.answer}
                answerImg={question?.answerImg}
                onNext={onClickShowNextQuestion}
              />
            ) : (
              <Button fullWidth onClick={onClickShowAnswer} variant={'primary'}>
                {t('Show Answer')}
              </Button>
            )}
          </Cards>
        </div>
      </ScrollBar>
    </div>
  )
}
