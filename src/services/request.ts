import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTHORIZATION, CONTENT_TYPE } from './constants'

interface RequestProps {
  url: string
  method?: string
  body?: any
  headers?: Headers
  keycloack?: boolean
}

export const request = async ({
  url,
  method = 'GET',
  headers = new Headers(),
  body,
  keycloack
}: RequestProps) => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token')
      console.log('OSDKSOKDSOsasasasasasKDSOSDK', jsonValue)
      // jsonValue != null ? JSON.parse(jsonValue) : null
      return jsonValue
    } catch (e) {
      console.log('erronotoken', e)
    }
  }

  const accessToken = await getData()

  const endpoint = keycloack
    ? `http://localhost:8080${url}`
    : `http://localhost:8081${url}`

  // const testeToken =
  //'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDcHhhVFkyb2ZNTVpaa2xEalZzdHlMQjJDaDJxa1d6VVdDTkZHQ3d2YldJIn0.eyJleHAiOjE3MTk1NTczNTAsImlhdCI6MTcxOTUzOTM1MCwianRpIjoiYzk4NzY0MDgtODlmYi00M2EzLWFmMzUtMjIyYjJhMGJiODc5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9zYWxhbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyMjc0NmFmYS00NDRlLTQ4MTUtOGI5My05YzQ1MTBhNTBmOTIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYWxhb19jbGllbnQiLCJzaWQiOiI3M2I0NmFlMy1hMWJhLTQ3NDctYjc2OS0wMjE4YjMzMmM5Y2YiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Mi8qIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgyIiwiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLXNhbGFvIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJmZXJuYW5kYTEifQ.luR-xGXSU6enqzDNpQofKFkuNC925z3XR6QhzHFN2xD4qzU6qszKYBgHczsUTPYu0-qNbr5tvgg09ESwkjluSQfFOaXQBBg8sf--FLAgD--bD-wbXmZ4H2kUWB8UXk6BsXgKWNJTd36As2fPws39JVaTaqc5irwINI7lKMAvb8QPEud2o-xYqyk3NkUMSV9Mi7PMlBZCyYmnOMiI7c_cc3_Bl2-mqhdBzY26rf13xitvXF0uB3Av8yAwCkzgfEd-F4HU9qrouKnzLSJhMFQSivqvhaueGL-i7io-TuxQPOtZEtSP5lMEw2aWTha5uKlYv4sqDpjLMGsGGinsO3SOEw'
  if (!headers.has(CONTENT_TYPE)) {
    headers.append(CONTENT_TYPE, 'application/json')
  }

  headers.append(AUTHORIZATION, 'Bearer ' + accessToken)

  const options = {
    method,
    body,
    headers
  }

  return await fetch(endpoint, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na rede: ' + response.status)
      }

      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error)
    })
}

// PRA BUSCAR COISA DE USUARIO USA O TOKEN DO USER LOGADO
// PARA CRIAR USUARIO USA O TOKEN DO LOGIN ADMIN
