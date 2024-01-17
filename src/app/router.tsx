import { Suspense } from 'react'
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/layout/layout'
import { useGetMeQuery } from '@/entity/auth/api/auth.api'
import { Deck } from '@/entity/deck/ui/deck/deck.tsx'
import { DeckPage } from '@/pages/deck-page.tsx'
import { DecksPage } from '@/pages/decks-page.tsx'
import { LearnPage } from '@/pages/learn-page.tsx'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksPage />,
    path: '/',
  },
  {
    children: [
      {
        element: <LearnPage />,
        path: '/:deckId/learn',
      },
      {
        element: <Deck />,
        path: '/:deckId',
      },
    ],
    element: <DeckPage />,
    path: '/:deckId',
  },
]

function PrivateRoutes() {
  const { data: me } = useGetMeQuery()
  const isAuthenticated = me?.id

  return isAuthenticated ? (
    <Suspense fallback={'loading...'}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={'/login'} />
  )
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
