import { baseApi } from '@/app/baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserType | undefined, void>({
      providesTags: ['Auth'],
      async queryFn(_name, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          method: 'GET',
          url: `v1/auth/me`,
        })

        if (result.error) {
          // but refetch on another error
          return { data: undefined }
        }

        return { data: result.data as UserType }
      },
    }),
  }),
})

export const { useGetMeQuery } = authApi

export type UserType = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
