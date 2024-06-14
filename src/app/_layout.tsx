import { SessionProvider } from '@src/state/session-provider'
import { StateContextProvider } from '@src/state/state-provider'
import 'expo-dev-client'
import { Slot } from 'expo-router'

export default function AppLayout() {
  return (
    <StateContextProvider>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </StateContextProvider>
  )
}
