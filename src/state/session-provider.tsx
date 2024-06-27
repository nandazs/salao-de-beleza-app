import React, { useEffect, useState } from 'react'
import { useStorageState } from './hooks/useStorageState'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack } from 'expo-router'
import { useSignIn } from '@src/services/hooks'
import { LoginRequest } from '@src/services/types'

const AuthContext = React.createContext<{
  session?: string | null
  isLoading: boolean
  setSession: (session: string | null) => void
  handleLogout: () => void
  handleLogin: (
    credentials: LoginRequest,
    onSuccess?: () => void,
    onError?: () => void
  ) => void
}>({
  session: null,
  isLoading: false,
  setSession: () => null,
  handleLogin: () => null,
  handleLogout: () => null
})

export function useSessionContext() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider() {
  const [[isLoading, session], setSession] = useStorageState('session') // ignorar é do expo
  const [loggedIn, setLoggedIn] = useState(false)

  const signIn = useSignIn()

  const handleLogin = (
    credentials: LoginRequest,
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    signIn.mutate(credentials, {
      onSuccess: (response) => {
        onSuccess?.()
        saveLoggedInToken(response.accessToken)
        checkIfLoggedInTokenSaved()
      },
      onError: () => {
        // Esse é um teste usado apenas para quando o login dá falha
        console.log('TESTE')
        onError?.()
        saveLoggedInToken(
          'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDcHhhVFkyb2ZNTVpaa2xEalZzdHlMQjJDaDJxa1d6VVdDTkZHQ3d2YldJIn0.eyJleHAiOjE3MTk1NDgzMjUsImlhdCI6MTcxOTUzMDMyNSwianRpIjoiMzdkOTYwYTgtNGMyZi00YTA3LThmYjgtYzY1Zjk5ZTZlYWY1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9zYWxhbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyMjc0NmFmYS00NDRlLTQ4MTUtOGI5My05YzQ1MTBhNTBmOTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYWxhb19jbGllbnQiLCJzaWQiOiJlZjYxZDBjYy03MmMyLTQ3OGItYmQ5NC03YjJjOTVlMDZiMzEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgyIiwiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXNhbGFvIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJmZXJuYW5kYTEifQ.XjvPc_HCKm3sk5JqKG5Km9d5_cmM2Ih07QtE9yYj4WQynq9Hch2HH5J3NSAf9J-jC8GVRNGu7FD34DR8wPnhyBFxdgqNQ08IkkxlIGAQxCi5ZYgQPMYH_RKD2ol3Fl4GUrVpL62zruc8mIRVT0VMvqfNw5ghriPC4XtIQe03UK753PBgMYHEZ8MIhq5EL06N0CcdraZy096Q3cpdAfjxQmMVeg9sLvUffcLYW3rn9WiOgZDt0xN-yZCtltpaws-T9qKlcRwdsKL7_IbuTGy7GzOZDa_oWVJR69qR-5CwLqcwfrZ7H0K6l6-7oPve6KmDbcTdMWsBuvwTdncW63RrWg'
        )
      }
    })
  }

  const saveLoggedInToken = async (token: string) => {
    await AsyncStorage.setItem('token', token)
  }

  const removeLoggedInToken = async () => {
    await AsyncStorage.removeItem('token')
  }

  const checkIfLoggedInTokenSaved = async () => {
    const value = await AsyncStorage.getItem('token')

    if (value !== null) {
      setLoggedIn(true)
    }
  }

  const handleLogout = () => {
    removeLoggedInToken()
    setLoggedIn(false)
  }

  useEffect(() => {
    checkIfLoggedInTokenSaved()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        setSession,
        handleLogin,
        handleLogout
      }}>
      <Stack
        screenOptions={{
          headerShown: false
        }}>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="admin/index"
              options={{
                title: ''
              }}
            />
            <Stack.Screen
              name="cliente/index"
              options={{
                title: ''
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="index"
              options={{
                title: ''
              }}
            />
            <Stack.Screen
              name="login/index"
              options={{
                title: ''
              }}
            />
          </>
        )}
      </Stack>
    </AuthContext.Provider>
  )
}

// https://medium.com/@surafelk/react-native-expo-simple-user-authentication-flow-using-usecontext-react-navigation-85dc94cdd74a
