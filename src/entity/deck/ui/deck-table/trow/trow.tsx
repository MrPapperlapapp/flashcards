import { Grade } from '@/components/ui/grade/grade'
import { useEditGradeMutation } from '@/entity/deck/api/deck.api'
import { Cards } from '@/entity/deck/api/deck.types'

export const Trow = ({ data }: PropsType) => {
  const [editGrade] = useEditGradeMutation()

  if (!data) {
    return null
  }
  const onEditGrade = (grade: number) => editGrade({ cardId: data.id, deckId: data.deckId, grade })

  return (
    <tr>
      <td>{data?.question}</td>
      <td>{data?.answer}</td>
      <td>{data?.updated}</td>
      <td>
        <Grade grade={data?.grade} onEditGrade={onEditGrade} />
      </td>
      <td></td>
    </tr>
  )
}

type PropsType = {
  data?: Cards
}
