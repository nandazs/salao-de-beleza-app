export interface LoginRequest {
  email: string
  password: string
}

export interface SubmitScheduleRequest {
  idCliente: string
  idFuncionario: string
  idSalao: string
  inicio: string
  fim: string
}

export interface GetProfessionalsRequest {
  id: string
}

export interface GetSalonSchedulesRequest {
  id: string
}

export interface GetClientSchedulesRequest {
  id: string
}

export interface GetAllSalonsResponse {
  salons: Array<string>
}

interface Error {
  description: string
  key: number
  message: string
  status: number
  hasError: boolean
}
