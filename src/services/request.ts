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
      // console.log('Log de teste', jsonValue)
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

  if (!headers.has(CONTENT_TYPE)) {
    headers.append(CONTENT_TYPE, 'application/json')
  }

  if (!headers.has(AUTHORIZATION)) {
    headers.append(AUTHORIZATION, 'Bearer ' + accessToken)
  }

  const options = {
    method,
    body,
    headers
  }

  return await fetch(endpoint, options)
    .then((response) => {
      return response
    })
    .then((response) => {
      const json = response.json()

      if (!response.ok) {
        throw new Error('Erro na rede: ' + response.status)
      }

      return json
    })
    .catch((error) => {
      console.error(error)
    })
}

// PRA BUSCAR COISA DE USUARIO USA O TOKEN DO USER LOGADO
// PARA CRIAR USUARIO USA O TOKEN DO LOGIN ADMIN

/*return await fetch(endpoint, options)
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
    })*/
