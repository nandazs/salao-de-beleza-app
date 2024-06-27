import { getSiteConfigs } from '@src/utils/site'
import {
  normalizeErrorResponse,
  normalizedGetProfessionalsTime
} from '../normalizers/normalizers'
import { request } from './request'
import {
  LoginRequest,
  RequestRegisterProfessional,
  RequestRegisterSchedule,
  RequestUpdateProfessionalServices,
  ResponseClientSchedules,
  ResponseGetAllSalon,
  ResponseProfessionals,
  ResponseProfessionalsTimes,
  ResponseSalonSchedules,
  ResponseServicesBySalon
} from './types'

export const getAllSalons = async (): Promise<ResponseGetAllSalon> => {
  const response = await request({
    url: `/salao`,
    method: 'GET'
  })

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    // throw { error }
  }

  return response ?? [{}]
}

export const getClientSchedules = async (
  id: number
): Promise<ResponseClientSchedules> => {
  const response = await request({
    url: `/agendamentos/cliente/${id}`,
    method: 'GET'
  })

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    throw { error }
  }

  return response
}

export const getSalonSchedules = async (
  id: string
): Promise<ResponseSalonSchedules> => {
  return await request({
    url: `/agendamentos/salao/${id}`,
    method: 'GET'
  })
}

export const getServicesBySalon = async (
  id: string
): Promise<ResponseServicesBySalon> => {
  return await request({
    url: `/funcionarios/salao/${id}`,
    method: 'GET'
  })
}

export const getProfessionalsBySalon = async (
  id: string
): Promise<ResponseProfessionals> => {
  return await request({
    url: `/funcionarios/salao/${id}`,
    method: 'GET'
  })
}

export const getProfessionalsTimes = async (
  id: string
): Promise<ResponseProfessionalsTimes> => {
  const response = await request({
    url: `/funcionarios/horarios/${id}`,
    method: 'GET'
  })

  return normalizedGetProfessionalsTime(response)
}

export const registerProfessional = async (
  props: RequestRegisterProfessional
) => {
  const response = await request({
    url: '/funcionarios/cadastrar',
    method: 'POST',
    body: JSON.stringify({
      nome: props.name,
      idSalao: props.salon,
      servicos: props.services
    })
  })

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    throw { error }
  }

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
      fim: ''
    })
  })

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    throw { error }
  }

  return response
}

export const updateProfessionalServices = async (
  props: RequestUpdateProfessionalServices
) => {
  console.log('osdksosdkosdksd', props)

  const response = await request({
    url: '/funcionarios/cadastrar',
    method: 'POST',
    body: JSON.stringify({
      idFuncionario: props.professionalId,
      services: props.services
    })
  })

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    throw { error }
  }

  return response
}

export const login = async ({ email, password }: LoginRequest) => {
  const headers = new Headers()
  const site = getSiteConfigs()
  headers.append('client_secret', site.keycloackClientSecret)
  headers.append('client_id', site.keycloackClientId)
  headers.append('grant_type', 'password')
  headers.append('Content-type', 'application/x-www-form-urlencoded')

  const response = await request({
    url: '/realms/salao/protocol/openid-connect/token',
    method: 'POST',
    body: JSON.stringify({
      username: email,
      password: password
    }),
    headers
  })

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    throw { error }
  }

  return response
}

export const deleteProfessional = async (salonId: string) => {
  const response = await request({
    url: `/funcionarios/${salonId}`,
    method: 'DELETE'
  })

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    throw { error }
  }

  return response
}
