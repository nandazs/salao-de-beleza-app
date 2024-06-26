export type NormalizedSchedules = Array<NormalizedSchedule>

export type NormalizedSchedule = {
  idAgendamento: string
  nomeSalao: string
  nomeCliente: string
  nomeFuncionario: string
  data: string
  hora: string
  servico?: string
}

export interface NormalizedTimes {
  time: string
  date: string
}

interface Error {
  description: string
  key: number
  message: string
  status: number
  hasError: boolean
}
