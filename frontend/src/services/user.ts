export interface UserResponse {
  id: string
  name: string
  username: string
  isOnline: boolean
  createdAt: Date
  updatedAt: Date
}

const baseUrl = "http://localhost:3000"

export async function getOnline(token: string): Promise<UserResponse[]> {
  const res = await fetch(`${baseUrl}/user/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status !== 200) {
    throw new Error()
  }

  const result = (await res.json()) as UserResponse[]

  return result
}
