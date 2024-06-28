import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack } from 'expo-router'
import { useGetToken, useSignIn } from '@src/services/hooks'
import { LoginRequest } from '@src/services/types'

const AuthContext = React.createContext<{
  handleLogout: () => void
  handleLogin: (
    credentials: LoginRequest,
    onSuccess?: () => void,
    onError?: () => void
  ) => void
  handleUnloggedToken: () => void
}>({
  handleLogin: () => null,
  handleLogout: () => null,
  handleUnloggedToken: () => null
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
  const [loggedIn, setLoggedIn] = useState(false)

  const signIn = useSignIn()
  const getToken = useGetToken()

  const handleUnloggedToken = () => {
    getToken.mutate('client_credentials', {
      onSuccess: (response) => {
        saveLoggedInToken(response.accessToken)
      },
      onError: () => {
        // Esse é um teste usado apenas para quando dá falha
        console.log('TESTE')
        saveLoggedInToken(
          'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDcHhhVFkyb2ZNTVpaa2xEalZzdHlMQjJDaDJxa1d6VVdDTkZHQ3d2YldJIn0.eyJleHAiOjE3MTk1NjQ3MzYsImlhdCI6MTcxOTU0NjczNiwianRpIjoiM2VhMDcwZWItYmUxYi00Yjk0LWE1MmMtNzU3NTNlMWQwOTY2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9zYWxhbyIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiIyOTg3ODlhNC02NmRhLTQ3ZDktYjBlMi0xZmFmOTcyNWQwMmEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYWxhb19jbGllbnQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgyIiwiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXNhbGFvIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtdXNlcnMiXX0sInNhbGFvX2NsaWVudCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMDowOjA6MDowOjA6MDoxIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXNhbGFvX2NsaWVudCIsImNsaWVudEFkZHJlc3MiOiIwOjA6MDowOjA6MDowOjEiLCJjbGllbnRfaWQiOiJzYWxhb19jbGllbnQifQ.OMsJGdPseUj1-gps47X35cEfz_1iwFGnIJGbdCMx_z7qtjN22yDatKMWjDnpA5MpOpW1XY3qjsLQRHEu0Ptqz3QbVp9bbaIAO4dvy3xcbVC42suaEFra1WOieeTibr3cwY6QbkvQkWMYIbAF9nfmq9fXu-uPVMNPVGg6-gce0JDL-fWQt5cTE6GotM-AIaHyiP50d4RA0PkQ1TkP0GVGAhdQNAQMaupO81KqrHTS0J3gmuy7fN4RRgdGhoPjGawVq-2WT-wfkcTjK1MYKKSfmMWvFkkTaMk2yF4LO80rh9K0KDjW99X9TvWwuNluPXYyoOoLFqWm6L6M1Ge8eBxZoA'
        )
      }
    })
  }

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
          'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDcHhhVFkyb2ZNTVpaa2xEalZzdHlMQjJDaDJxa1d6VVdDTkZHQ3d2YldJIn0.eyJleHAiOjE3MTk1NTc3MzUsImlhdCI6MTcxOTUzOTczNSwianRpIjoiODkxNmYzZjUtNjdlNi00MmQ4LWE5M2QtNDRkY2FlYTFhOTJmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9zYWxhbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyMjc0NmFmYS00NDRlLTQ4MTUtOGI5My05YzQ1MTBhNTBmOTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYWxhb19jbGllbnQiLCJzaWQiOiIzZDQwMzFkMi1kOGRjLTQ1MDEtOGI4MS05NzAxODFkOWNhMTkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgyIiwiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXNhbGFvIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJmZXJuYW5kYTEifQ.Lx3tHX0JxdGecoxFG42wQLCEQZonBo8lMTQxDjV1H7ghM3OaRWjph58jazzjbY6AoecKGSfCi9HMm7eHZCiluKD-XNqTcY8K7e9uG0hae5J4afZAirZcdurDXX-uPjlfWFad-Y3ACqGe2XqFDRMPusLl1eKM_d15SKJw7FSOyCIppQk1797BzxvdHl2EFwXyoLpUXkAl5M9jrvSRUFeg_nI3_QYT6LOYsUIlj-_BHX0n1OW5xGmdw4X5foqI3lAgiJ1-Id8VK-7x0B-31xO6RstDy-66Rlr7flDBurvLSrvDvg3eFX_t-irakRehs0HCGSFYWg7AGPFHnf0J1A-Drg'
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
        handleLogin,
        handleLogout,
        handleUnloggedToken
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
