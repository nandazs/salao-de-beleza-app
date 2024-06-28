import { getSiteConfigs } from '@src/utils/site'
import { request } from './request'
import { LoginRequest, RequestRegisterSchedule } from './types'
import { CLIENT_ID, CLIENT_SECRET, CONTENT_TYPE, GRANT_TYPE } from './constants'

export const login = async ({ email, password }: LoginRequest) => {
  const headers = new Headers()
  const site = getSiteConfigs()
  headers.append(CLIENT_SECRET, site.keycloackClientSecret)
  headers.append(CLIENT_ID, site.keycloackClientId)
  headers.append(GRANT_TYPE, 'password')
  headers.append(CONTENT_TYPE, 'application/x-www-form-urlencoded')

  const data = {
    username: email,
    password: password
  }

  console.log('OKSDOSDKSDOKSDO', data)

  const body = Object.keys(data)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    })
    .join('&')

  const response = await request({
    url: '/realms/salao/protocol/openid-connect/token',
    method: 'POST',
    body,
    headers,
    keycloack: true
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
