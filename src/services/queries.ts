import { normalizeErrorResponse } from './normalizers'
import { request } from './request'
import {
  GetAllSalonsResponse,
  GetClientSchedulesRequest,
  GetProfessionalsRequest,
  GetSalonSchedulesRequest
} from './types'

export const getAllSalons = async () => {
  const response = (await request({
    url: `/salao`,
    method: 'GET'
  })) as GetAllSalonsResponse

  const error = normalizeErrorResponse(response)

  if (error.hasError) {
    throw { error }
  }
}

export const getProfessionals = async ({ id }: GetProfessionalsRequest) => {
  return await request({
    url: `/funcionarios/salao/${id}`,
    method: 'GET'
  })
}

export const getSalonSchedules = async ({ id }: GetSalonSchedulesRequest) => {
  return await request({
    url: `/agendamentos/salao/${id}`,
    method: 'GET'
  })
}

export const getClientSchedules = async ({ id }: GetClientSchedulesRequest) => {
  return await request({
    url: `/agendamentos/cliente/${id}`,
    method: 'GET'
  })
}
