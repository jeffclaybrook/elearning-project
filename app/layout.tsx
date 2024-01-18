import type { Metadata } from "next"
import { ReactNode } from "react"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ToastProvider } from "@/components/providers/toaster-provider"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
 title: "LMS App",
 description: "Created using Next.js"
}

export default function RootLayout({
 children
}: {
 children: ReactNode
}) {
 return (
  <ClerkProvider>
   <html lang="en">
    <body className={inter.className}>
     <ConfettiProvider />
     <ToastProvider />
     {children}     
    </body>
   </html>
  </ClerkProvider>
 )
}