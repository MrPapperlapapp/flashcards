import { GradeIcon } from '@/assets/icons/grade-icon'
import { UnGradeIcon } from '@/assets/icons/ungrade-icon'
import { Button } from '@/components'

import s from './grade.module.scss'

export const Grade = ({ grade = 0 }: PropsType) => {
  return (
    <div className={s.container}>
      {Array.from({ length: 5 }, (_, idx) => idx + 1).map(g => (
        <Button key={g} variant={'icon'}>
          {grade >= g ? <GradeIcon className={s.item} /> : <UnGradeIcon className={s.item} />}
        </Button>
      ))}
    </div>
  )
}

type PropsType = {
  grade?: number
}
