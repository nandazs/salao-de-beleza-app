import { getSiteConfigs } from '@src/utils/site'
import { request } from './request'
import { LoginRequest, RequestRegisterSchedule, User } from './types'
import { AUTHORIZATION, CONTENT_TYPE } from './constants'

export const loginTodo = async ({
  email,
  password
}: LoginRequest): Promise<string> => {
  const site = getSiteConfigs()

  const headers = new Headers()
  headers.append(CONTENT_TYPE, 'application/x-www-form-urlencoded')
  const body = new URLSearchParams()
  body.append('client_secret', site.keycloackClientSecret)
  body.append('client_id', site.keycloackClientId)
  body.append('grant_type', 'password')
  body.append('username', email)
  body.append('password', password)

  const response = await request({
    url: '/realms/salao/protocol/openid-connect/token',
    method: 'POST',
    body: body.toString(),
    headers,
    keycloack: true
  })

  return response.access_token
}

export const getUserDataTodo = async (token?: string): Promise<User> => {
  const headers = new Headers()
  if (token) {
    headers.append(AUTHORIZATION, 'Bearer ' + token)
  }
  const response = await request({
    url: `/user`,
    method: 'GET',
    headers
  })

  return response
}

export const registerSchedule = async ({
  date,
  professional,
  clientId,
  salonId,
  service,
  time
}: RequestRegisterSchedule) => {
  if (!date || !professional || !date) {
    return null
  }

  const [day, mouth, year] = date.split('/')
  const dataFormatada = `${year}-${mouth}-${day}`

  const inicio = `${dataFormatada} ${time}`

  const response = await request({
    url: '/agendamentos/cadastrar',
    method: 'POST',
    body: JSON.stringify({
      idCliente: clientId,
      idFuncionario: professional.id,
      idSalao: salonId,
      servico: service,
      inicio,
      fim: '2024-06-27 11:00'
    })
  })

  return response
}
