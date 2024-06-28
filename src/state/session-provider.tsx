import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack, useRouter } from 'expo-router'
import { useGetToken, useLogin } from '@src/services/hooks'
import { LoginRequest } from '@src/services/types'

const AuthContext = React.createContext<{
  handleLogout: () => void
  handleLogin: (
    credentials: LoginRequest,
    onSuccess?: () => void,
    onError?: () => void
  ) => void
  handleUnloggedToken: (goHome?: boolean) => void
  setRole: (role: string) => void
  role?: string | null
}>({
  handleLogin: () => null,
  handleLogout: () => null,
  handleUnloggedToken: () => null,
  setRole: () => null,
  role: null
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
  const [role, setRole] = useState<string>()
  const getToken = useGetToken()
  const login = useLogin()
  const router = useRouter()

  const handleUnloggedToken = (goHome?: boolean) => {
    getToken.mutate('client_credentials', {
      onSuccess: (response) => {
        saveLoggedInToken(response.accessToken)
        goHome && router.push('/')
      },
      onError: () => {
        // Esse é um teste usado apenas para quando dá falha
        console.log('TESTE')
        //saveLoggedInToken(
        // 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDcHhhVFkyb2ZNTVpaa2xEalZzdHlMQjJDaDJxa1d6VVdDTkZHQ3d2YldJIn0.eyJleHAiOjE3MTk1NTc3MzUsImlhdCI6MTcxOTUzOTczNSwianRpIjoiODkxNmYzZjUtNjdlNi00MmQ4LWE5M2QtNDRkY2FlYTFhOTJmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9zYWxhbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyMjc0NmFmYS00NDRlLTQ4MTUtOGI5My05YzQ1MTBhNTBmOTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYWxhb19jbGllbnQiLCJzaWQiOiIzZDQwMzFkMi1kOGRjLTQ1MDEtOGI4MS05NzAxODFkOWNhMTkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgyIiwiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXNhbGFvIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJmZXJuYW5kYTEifQ.Lx3tHX0JxdGecoxFG42wQLCEQZonBo8lMTQxDjV1H7ghM3OaRWjph58jazzjbY6AoecKGSfCi9HMm7eHZCiluKD-XNqTcY8K7e9uG0hae5J4afZAirZcdurDXX-uPjlfWFad-Y3ACqGe2XqFDRMPusLl1eKM_d15SKJw7FSOyCIppQk1797BzxvdHl2EFwXyoLpUXkAl5M9jrvSRUFeg_nI3_QYT6LOYsUIlj-_BHX0n1OW5xGmdw4X5foqI3lAgiJ1-Id8VK-7x0B-31xO6RstDy-66Rlr7flDBurvLSrvDvg3eFX_t-irakRehs0HCGSFYWg7AGPFHnf0J1A-Drg'
        // )
      }
    })
  }

  const handleLogin = useCallback((data: LoginRequest) => {
    login.mutate(data, {
      onSuccess: (data) => {
        saveLoggedInToken(data)
        checkIfLoggedInTokenSaved()
      },
      onError: () => {
        // Esse é um teste usado apenas para quando o login dá falha
        console.log('TESTE')
        //saveLoggedInToken(
        // 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDcHhhVFkyb2ZNTVpaa2xEalZzdHlMQjJDaDJxa1d6VVdDTkZHQ3d2YldJIn0.eyJleHAiOjE3MTk1NTc3MzUsImlhdCI6MTcxOTUzOTczNSwianRpIjoiODkxNmYzZjUtNjdlNi00MmQ4LWE5M2QtNDRkY2FlYTFhOTJmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9zYWxhbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyMjc0NmFmYS00NDRlLTQ4MTUtOGI5My05YzQ1MTBhNTBmOTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYWxhb19jbGllbnQiLCJzaWQiOiIzZDQwMzFkMi1kOGRjLTQ1MDEtOGI4MS05NzAxODFkOWNhMTkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgyIiwiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXNhbGFvIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJmZXJuYW5kYTEifQ.Lx3tHX0JxdGecoxFG42wQLCEQZonBo8lMTQxDjV1H7ghM3OaRWjph58jazzjbY6AoecKGSfCi9HMm7eHZCiluKD-XNqTcY8K7e9uG0hae5J4afZAirZcdurDXX-uPjlfWFad-Y3ACqGe2XqFDRMPusLl1eKM_d15SKJw7FSOyCIppQk1797BzxvdHl2EFwXyoLpUXkAl5M9jrvSRUFeg_nI3_QYT6LOYsUIlj-_BHX0n1OW5xGmdw4X5foqI3lAgiJ1-Id8VK-7x0B-31xO6RstDy-66Rlr7flDBurvLSrvDvg3eFX_t-irakRehs0HCGSFYWg7AGPFHnf0J1A-Drg'
        // )
      }
    })
  }, [])

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

  const handleLogout = useCallback(() => {
    removeLoggedInToken()
    setLoggedIn(false)
    handleUnloggedToken(true)
  }, [loggedIn])

  useEffect(() => {
    checkIfLoggedInTokenSaved()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        handleUnloggedToken,
        setRole,
        role
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
