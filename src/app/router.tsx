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
import { Deck } from '@/pages/deck'
import { Decks } from '@/pages/decks'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Decks />,
    path: '/',
  },
  {
    element: <Deck />,
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
