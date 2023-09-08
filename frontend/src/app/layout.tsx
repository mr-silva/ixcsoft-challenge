import { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/AuthContext"

export const metadata: Metadata = {
  title: "IXC Soft - Chat App",
  description: "Chat app, that allow users to talk to each other"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-zinc-800 text-zinc-50">{children}</body>
      </AuthProvider>
    </html>
  )
}
