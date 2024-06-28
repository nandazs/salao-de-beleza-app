import {
  ResponseClientSchedules,
  ResponseLogin,
  ResponseProfessionalsTimes,
  ResponseSalonSchedules
} from '../services/types'
import { NormalizedSchedules, NormalizedTimes, type Error } from './types'

export const normalizeErrorResponse = (response: any): Error => {
  const error = {
    description: response?.errorDescription,
    key: response?.errorKey,
    message: response?.errorMessage,
    status: response?.errorStatus,
    hasError: !!response?.hasError
  }

  if (error.hasError) {
    throw { error }
  }

  return response ?? []
}

export const normalizeClientSchedules = (
  response: ResponseClientSchedules
): NormalizedSchedules | [] => {
  if (!response) {
    return []
  }

  return response.map((schedule) => {
    const dateAndTime = normalizedDate(schedule.inicio)

    return {
      idAgendamento: schedule.idAgendamento,
      nomeSalao: schedule.nomeSalao,
      nomeCliente: schedule.nomeCliente,
      nomeFuncionario: schedule.nomeFuncionario,
      hora: dateAndTime.time,
      data: dateAndTime.date,
      servico: schedule.servico
    }
  })
}

export const normalizeSalonSchedules = (
  response: ResponseSalonSchedules
): NormalizedSchedules | [] => {
  if (!response) {
    return []
  }

  return response.map((schedule) => {
    const dateAndTime = normalizedDate(schedule.inicio)

    return {
      idAgendamento: schedule.idAgendamento,
      nomeSalao: schedule.nomeSalao,
      nomeCliente: schedule.nomeCliente,
      nomeFuncionario: schedule.nomeFuncionario,
      hora: dateAndTime.time,
      data: dateAndTime.date,
      servico: schedule.servico
    }
  })
}

export const normalizedDate = (value: string): NormalizedTimes => {
  const dateAndTime = value.split(' ')
  const time = dateAndTime[1]
  const date = dateAndTime[0]
  const [year, mounth, day] = date.split('-')
  const formattedDate = `${day}/${mounth}/${year}`

  return { time, date: formattedDate }
}

export const normalizeGetProfessionalsTime = (
  value: ResponseProfessionalsTimes
): NormalizedTimes[] => {
  return value.map((item) => {
    return normalizedDate(item.dataInicio)
  })
}

export const normalizedLogin = (response: ResponseLogin) => {
  return {
    accessToken: response.access_token
  }
}
