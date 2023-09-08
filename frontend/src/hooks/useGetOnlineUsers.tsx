"use client"

import { useQuery } from "react-query"
import { parseCookies } from "nookies"
import { UserResponse, getOnline } from "../services/user"

export type GetOnlineUsersResponse = {
  data: UserResponse[] | undefined
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
}

export function useGetOnlineUsers(): GetOnlineUsersResponse {
  const { "nextauth.token": token } = parseCookies()

  const { isLoading, isError, isSuccess, data } = useQuery(
    ["useGetOnlineUsers", token],
    () => getOnline(token),
    { enabled: false }
  )

  return {
    data,
    isSuccess,
    isLoading,
    isError
  }
}
