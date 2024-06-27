import { SessionProvider } from '@src/state/session-provider'
import { StateContextProvider } from '@src/state/state-provider'
import 'expo-dev-client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function AppLayout() {
  return (
    <StateContextProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider />
      </QueryClientProvider>
    </StateContextProvider>
  )
}
