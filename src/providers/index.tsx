'use client'
import { ReactNode } from 'react'
import { ReactQueryProvider } from './react-query'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
