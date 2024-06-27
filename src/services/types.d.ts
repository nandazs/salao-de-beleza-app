export interface LoginRequest {
  email: string
  password: string
}

export interface RequestRegisterProfessional {
  name: string
  salon?: string
  services: string[]
}

export interface RequestUpdateProfessionalServices {
  professionalId?: string
  services?: string[]
}

export interface RequestRegisterSchedule {
  clientId?: number
  salonId?: string
  professional?: {
    name: string
    id: string
  }
  service?: string
  date?: string
  time?: string
}

export type ResponseSalonSchedules = SchedulesType

export type ResponseClientSchedules = SchedulesType

export type ResponseGetAllSalon = Array<{
  idSalao: string
  nomeSalao: string
  funcionarios: string[]
}>

export type ResponseProfessionals = Array<Professional>

export type ResponseServicesBySalon = Array<{
  nome: string
  id: string
}>

export type ResponseProfessionalsTimes = Array<{
  time: string
  date: string
}>

type SchedulesType = Array<Schedule>

export type Schedule = {
  idAgendamento: string
  nomeSalao: string
  nomeCliente: string
  nomeFuncionario: string
  inicio: string
  fim: string
  servico?: string
}

export type SalonSchedules = SchedulesType

export type ClientSchedules = SchedulesType

export interface Professional {
  nomeFuncionario: string
  nomeSalao: string
  idFuncionario: string
  servicosPrestados: string[]
}

export interface DateAndTime {
  time: string
  date: string
}

export interface ResponseLogin {
  access_token: string
}

export interface User {
  userId: number
  username: string
  role: 'SALAO' | 'CLIENTE'
  idRelacao: 4
}
