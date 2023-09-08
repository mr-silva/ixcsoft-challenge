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
  console.log("TOKEN", token)

  const res = await fetch(`${baseUrl}/user/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  console.log(res)

  if (res.status !== 200) {
    throw new Error()
  }

  console.log(res)

  const result = (await res.json()) as UserResponse[]

  return result
}
