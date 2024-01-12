import { useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'

import { Button, Loading, Typography } from '@/components'
import { Cards } from '@/components/ui/cards/cards'
import { ScrollBar } from '@/components/ui/scroll-bar/scroll-bar.tsx'
import { useEditGradeMutation, useGetQuestionQuery } from '@/entity/learn/api/learn.api'
import { AnswerForm, AnswerFormData } from '@/entity/learn/ui/answer-form'
import clsx from 'clsx'

import s from './learn-page.module.scss'

type learnProps = {
  className?: string
}

export const LearnPage = ({ className }: learnProps) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const { deckId } = useParams()
  const { title } = useOutletContext<{ title: string | undefined }>()
  const {
    data: questionData,
    isFetching,
    isLoading: isQuestionLoading,
  } = useGetQuestionQuery({
    id: deckId,
  })
  const [editGrade, { isLoading }] = useEditGradeMutation()

  const question = questionData
  const classNames = {
    attempts: s.attempts,
    cards: s.cards,
    question: s.question,
    questionImg: s.questionImg,
    root: clsx(s.root, className),
    text: s.text,
    title: s.title,
  }
  const onClickShowAnswer = () => {
    setIsShowAnswer(true)
  }
  const onClickShowNextQuestion = (data: AnswerFormData) => {
    setIsShowAnswer(false)
    editGrade({ cardId: question?.id!, deckId: deckId!, grade: +data.grade })
  }

  if (isFetching && isLoading) {
    console.log('isQuestionLoading ', isQuestionLoading)

    return <Loading />
  }

  return (
    <div className={classNames.root}>
      <ScrollBar maxHeight={'600px'} type={'always'}>
        <Cards as={'div'} className={classNames.cards}>
          <Typography className={classNames.title} variant={'large'}>
            {`Learn ${title}`}
          </Typography>
          <div className={classNames.text}>
            <Typography className={classNames.question} variant={'subtitle1'}>
              Question: {question?.question}
            </Typography>
            {question?.questionImg && (
              <div className={classNames.questionImg}>
                <img alt={'Question Image'} src={question?.questionImg} />
              </div>
            )}
            <Typography className={classNames.attempts} variant={'subtitle2'}>
              Количество попыток ответов на вопрос: 10
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
              Show Answer
            </Button>
          )}
        </Cards>
      </ScrollBar>
    </div>
  )
}
