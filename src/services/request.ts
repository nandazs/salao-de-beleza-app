import AsyncStorage from '@react-native-async-storage/async-storage'

interface RequestProps {
  url: string
  method?: string
  params?: Record<string, any>
  body?: any
  headers?: Headers
}

export const request = async ({
  url,
  method = 'GET',
  params,
  headers = new Headers(),
  body
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

  const endpoint = `http://localhost:8081${url}`

  const testeToken =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDcHhhVFkyb2ZNTVpaa2xEalZzdHlMQjJDaDJxa1d6VVdDTkZHQ3d2YldJIn0.eyJleHAiOjE3MTk1NDQwODgsImlhdCI6MTcxOTUyNjA4OCwianRpIjoiNjdlMzBiOTQtMGIzYS00ZjQxLTk1NzctN2I4MWQ4NGNiNzExIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9zYWxhbyIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiYWNjb3VudCJdLCJzdWIiOiIyOTg3ODlhNC02NmRhLTQ3ZDktYjBlMi0xZmFmOTcyNWQwMmEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYWxhb19jbGllbnQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1zYWxhbyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsibWFuYWdlLXVzZXJzIl19LCJzYWxhb19jbGllbnQiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjA6MDowOjA6MDowOjA6MSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1zYWxhb19jbGllbnQiLCJjbGllbnRBZGRyZXNzIjoiMDowOjA6MDowOjA6MDoxIiwiY2xpZW50X2lkIjoic2FsYW9fY2xpZW50In0.WFVap_ybFwBb-x7Q037lcUmyb7eIjzhs8Y-9JMDyZ4D4XjHKId9jrYS2pv6njvupY4MyX43j3pr_7ZsVh5pnxC2jh9IJt6MwpGD6yc-2xYg9XTWz4NfJjRT2FXIf6Ju35V04OYQMwA0RR5e9IFnfryBQnhDlmvmpLgQsteWf99aPiCsyDn-_XrGddws6nETxLG3nCOXN7hMhOsGeo4ZeiCj0-m0msz73_js7lUGk_P_vsKA84JbNr7w443EiJqrxE0BhcVBEVZz6-EKvdEtt_Hocg0Mwk7yLsJlHvMnNcmF7hSN1rv63bICvBYT95qOnPYRrVQ29L3s5AJuDTNWe7w'

  if (!headers.get('Content-Type')) {
    headers.append('Content-Type', 'application/json')
  }

  headers.append('Authorization', 'Bearer' + accessToken ?? testeToken)

  // PRA BUSCAR COISA DE USUARIO USA O TOKEN DO USER LOGADO
  // PARA CRIAR USUARIO USA O TOKEN DO LOGIN ADMIN

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
