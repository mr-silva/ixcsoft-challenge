import { SignInData } from "@/contexts/AuthContext"

interface SignInResponse {
  token: string
}

const baseUrl = "http://localhost:3000"

export async function signInRequest(data: SignInData): Promise<SignInResponse> {
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${data.username}:${data.password}`)}`
    }
  })

  if (res.status !== 200) {
    throw new Error()
  }

  const result = (await res.json()) as SignInResponse

  return result
}

export async function logOutRequest(token: string): Promise<void> {}
