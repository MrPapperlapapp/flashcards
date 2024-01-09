import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { Loading, Typography } from '@/components'
import { useGetCardsQuery, useGetDeckQuery } from '@/entity/deck/api/deck.api'

import s from './deck.module.scss'

export const DeckPage = () => {
  const { deckId } = useParams()
  const navigate = useNavigate()
  const { isLoading: isDeckLoading } = useGetDeckQuery({ id: deckId ?? '0' })
  const { isLoading: isCardsLoading } = useGetCardsQuery({ id: deckId ?? '0' })
  const { t } = useTranslation('deck')

  if (!deckId) {
    return <div>Error</div>
  }
  if (isCardsLoading || isDeckLoading) {
    return <Loading />
  }

  return (
    <>
      <div className={s.container}>
        <button onClick={() => navigate(-1)}>
          <Typography variant={'body2'}>{t('Back to Decks List')} </Typography>
        </button>
        <Outlet />
      </div>
    </>
  )
}
