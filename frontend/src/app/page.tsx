"use client"

import { AuthContext } from "@/contexts/AuthContext"
import { useGetOnlineUsers } from "@/hooks/useGetOnlineUsers"
import { UserResponse } from "@/services/user"
import { useContext, useEffect, useState } from "react"

export default function Home() {
  const { data } = useGetOnlineUsers()

  const [users, setUsers] = useState<UserResponse[]>([])

  useEffect(() => {
    setUsers(data!)
  }, [data])

  return (
    <div className="h-screen flex">
      <aside className="w-3/12">
        <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-zinc-800">
          {users &&
            users.map(user => (
              <ul key={user.id}>
                <li id={user.id}>{user.name}</li>
              </ul>
            ))}
        </div>
      </aside>

      <main className="flex flex-1 items-center justify-center bg-gray-50 text-zinc-800">
        <h1 className="text-8xl">IXC Soft</h1>
      </main>
    </div>
  )
}
