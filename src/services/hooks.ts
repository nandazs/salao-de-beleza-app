import { normalizeErrorResponse } from './normalizers'
import {
  getAllSalons,
  getClientSchedules,
  getProfessionals,
  getSalonSchedules
} from './queries'
import { request } from './request'
import {
  GetAllSalonsResponse,
  GetClientSchedulesRequest,
  GetProfessionalsRequest,
  GetSalonSchedulesRequest,
  LoginRequest,
  SubmitScheduleRequest
} from './types'
import { useQuery } from '@tanstack/react-query'

export const useLogin = async (props: LoginRequest) => {
  return await request({
    url: '/login',
    method: 'POST',
    body: {
      email: props.email,
      password: props.password
    }
  })
}

export const useSubmitSchedule = async ({
  idCliente,
  idFuncionario,
  idSalao,
  inicio,
  fim
}: SubmitScheduleRequest) => {
  return await request({
    url: '/agendamentos/cadastrar',
    method: 'POST',
    body: {
      idCliente,
      idFuncionario,
      idSalao,
      inicio,
      fim
    }
  })
}

export const useGetAllSalons = () => {
  const getSalons = async () => {
    try {
      const salons = await getAllSalons()
      return salons
    } catch (e) {
      return console.log(e)
    }
  }

  return useQuery({
    queryKey: ['all-salons'],
    queryFn: async () => await getSalons(),
    enabled: true
  })
}

export const useGetProfessionalsBySalon = (id: GetProfessionalsRequest) => {
  const queryFn = async () => {
    const response = await getProfessionals(id)

    if (!response) {
      return
    }

    return response
  }

  return useQuery({
    queryKey: ['salon-professionals'],
    queryFn: queryFn,
    enabled: true
  })
}

export const useGetSalonSchedules = (id: GetSalonSchedulesRequest) => {
  const queryFn = async () => {
    const response = await getSalonSchedules(id)

    if (!response) {
      return
    }

    return response
  }

  return useQuery({
    queryKey: ['salon-schedules'],
    queryFn: queryFn,
    enabled: true
  })
}

export const useGetClientSchedules = (id: GetClientSchedulesRequest) => {
  const queryFn = async () => {
    const response = await getClientSchedules(id)

    if (!response) {
      return
    }

    return response
  }

  return useQuery({
    queryKey: ['client-schedules'],
    queryFn: queryFn,
    enabled: true
  })
}
