"use client"

import { ReactNode, createContext, useState } from "react"
import { setCookie } from "nookies"
import { signInRequest } from "@/services/auth"
import { useRouter } from "next/navigation"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export type SignInData = {
  username: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  token: string | null
  signIn: (data: SignInData) => Promise<void>
  error: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)

  const isAuthenticated = !!token

  async function signIn({ username, password }: SignInData) {
    try {
      const { token } = await signInRequest({
        username,
        password
      })

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 1 // 1 hour
      })

      setToken(token)
      setError(false)

      router.push("/")
    } catch (e) {
      console.log(e)

      setToken(null)
      setError(true)
    }
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, signIn, error }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  )
}
