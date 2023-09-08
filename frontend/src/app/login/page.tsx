"use client"

import { useForm } from "react-hook-form"
import { Button } from "../../components"
import { useContext } from "react"
import { AuthContext } from "@/contexts/AuthContext"

export default function Login() {
  const { register, handleSubmit } = useForm()
  const { signIn, error } = useContext(AuthContext)

  async function handleSignIn(data: any) {
    await signIn(data)
  }

  return (
    <div className="h-screen flex">
      <aside className="flex flex-1 items-center justify-center ">
        <h1 className="text-8xl">IXC Soft</h1>
      </aside>

      <main className="w-3/12">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-sm w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Usuário
                  </label>
                  <input
                    {...register("username")}
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Usuário"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" label="Entrar" />
              </div>

              {error && (
                <div className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 ">
                  Erro na Autenticação
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
