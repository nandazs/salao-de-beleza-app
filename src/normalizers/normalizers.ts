import {
  DateAndTime,
  ResponseClientSchedules,
  ResponseLogin,
  ResponseProfessionalsTimes,
  ResponseSalonSchedules
} from '../services/types'
import { NormalizedSchedules, type Error } from './types'

export const normalizeErrorResponse = (error: any): Error => ({
  description: error?.errorDescription,
  key: error?.errorKey,
  message: error?.errorMessage,
  status: error?.errorStatus,
  hasError: !!error?.hasError
})

export const normalizeClientSchedules = (
  response: ResponseClientSchedules
): NormalizedSchedules => {
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
): NormalizedSchedules => {
  return response.map((schedule) => {
    const dateAndTime = normalizedDate(schedule.inicio)

    return {
      idAgendamento: schedule.idAgendamento,
      nomeSalao: schedule.nomeSalao,
      nomeCliente: schedule.nomeCliente,
      nomeFuncionario: schedule.nomeFuncionario,
      hora: dateAndTime.time,
      data: dateAndTime.date,
      servico: ''
    }
  })
}

export const normalizedDate = (value: string): DateAndTime => {
  const dateAndTime = value.split(' ')
  const time = dateAndTime[1]
  const date = dateAndTime[0]
  const [year, mounth, day] = date.split('-')
  const formattedDate = `${day}/${mounth}/${year}`

  return { time, date: formattedDate }
}

export const normalizedGetProfessionalsTime = (
  value: Array<{ dataInicio: string; dataFim: string }>
): ResponseProfessionalsTimes => {
  return value.map((item) => {
    return normalizedDate(item.dataInicio)
  })
}

export const normalizedLogin = (response: ResponseLogin) => {
  return {
    accessToken: response.access_token
  }
}
