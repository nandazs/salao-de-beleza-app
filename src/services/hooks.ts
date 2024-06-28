import {
  normalizeClientSchedules,
  normalizeGetProfessionalsTime,
  normalizeSalonSchedules,
  normalizedLogin
} from '../normalizers/normalizers'
import { login, registerSchedule } from './queries'
import { request } from './request'
import {
  LoginRequest,
  RequestRegisterProfessional,
  RequestRegisterSchedule,
  RequestUpdateProfessionalServices,
  ResponseGetAllSalon,
  ResponseGetToken,
  ResponseProfessionals,
  ResponseProfessionalsTimes,
  User
} from './types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { routes } from '@src/configs/types/routes'
import { useRouter } from 'expo-router'
import { getSiteConfigs } from '@src/utils/site'
import { CONTENT_TYPE } from './constants'
import { useAppContext } from '@src/state/hooks'

export const useGetAllSalons = () => {
  const queryFn = async () => {
    const response = (await request({
      url: `/salao`,
      method: 'GET'
    })) as Promise<ResponseGetAllSalon>

    return response ?? []
  }

  return useQuery({
    queryKey: ['all-salons'],
    queryFn,
    enabled: true
  })
}

export const useGetClientSchedules = (id?: number) => {
  if (!id) null

  const queryFn = async () => {
    const response = await request({
      url: `/agendamentos/cliente/${id}`,
      method: 'GET'
    })

    return normalizeClientSchedules(response)
  }

  return useQuery({
    queryKey: ['client-schedules'],
    queryFn: queryFn,
    enabled: true
  })
}

export const useGetSalonSchedules = (id: string) => {
  const queryFn = async () => {
    const response = await request({
      url: `/agendamentos/salao/${id}`,
      method: 'GET'
    })

    return normalizeSalonSchedules(response)
  }

  return useQuery({
    queryKey: ['salon-schedules'],
    queryFn: queryFn,
    enabled: true
  })
}

export const useGetProfessionalsBySalon = (id: string) => {
  const queryFn = async () => {
    const response = (await request({
      url: `/funcionarios/salao/${id}`,
      method: 'GET'
    })) as Promise<ResponseProfessionals>

    /* if (!response) {
      return
    }*/

    return response ?? []
  }

  return useQuery({
    queryKey: ['salon-professionals'],
    queryFn: queryFn,
    enabled: true
  })
}

export const useGetProfessionalsTimes = (id: string) => {
  const queryFn = async () => {
    const response = (await request({
      url: `/funcionarios/horarios/${id}`,
      method: 'GET'
    })) as ResponseProfessionalsTimes //Promise<ResponseProfessionalsTimes>

    /*if (!response) {
      return
    }*/

    return normalizeGetProfessionalsTime(response) ?? []
  }

  return useQuery({
    queryKey: ['professionals-times'],
    queryFn: queryFn,
    enabled: true
  })
}

export const useRegisterProfessional = () => {
  const queryFn = async (props: RequestRegisterProfessional) => {
    const response = await request({
      url: '/funcionarios/cadastrar',
      method: 'POST',
      body: JSON.stringify({
        nome: props.name,
        idSalao: props.salon,
        servicos: props.services
      })
    })

    /* if (!response) {
      return
    }*/

    return response
  }

  return useMutation({
    mutationKey: ['register-professional'],
    mutationFn: queryFn
  })
}

// REVISAR
export const useRegisterSchedule = () => {
  const { salonId } = useAppContext()

  const queryFn = async (props: RequestRegisterSchedule) => {
    const response = await registerSchedule({ ...props, salonId })

    /*if (!response) {
      return
    }*/

    return response ?? {}
  }

  return useMutation({
    mutationKey: ['register-schedule'],
    mutationFn: queryFn
  })
}

export const useUpdateProfessionalServices = () => {
  const queryFn = async (props: RequestUpdateProfessionalServices) => {
    const response = await request({
      url: '/funcionarios/servicos',
      method: 'PUT',
      body: JSON.stringify({
        idFuncionario: props.professionalId,
        servicos: props.services
      })
    })

    return response
  }

  return useMutation({
    mutationKey: ['update-professional-services'],
    mutationFn: queryFn
  })
}

export const useGetUserData = () => {
  const queryFn = async () => {
    const response = (await request({
      url: `/user`,
      method: 'GET'
    })) as User

    return response
  }

  return useQuery({
    queryKey: ['get-user-data'],
    queryFn,
    enabled: true
  })
}

export const useSignIn = () => {
  const router = useRouter()

  const queryFn = async (props: LoginRequest) => {
    const response = await login(props)
    console.log('sdlsplsplsdp', response)

    return normalizedLogin(response)
  }

  return useMutation({
    mutationKey: ['login'],
    mutationFn: queryFn,
    onSuccess: () => {
      const { data } = useGetUserData()

      if (data?.role === 'SALAO') {
        // router.push(routes.ADMIN_HOME)
      } else {
        //  router.push(routes.CLIENT_HOME)
      }
    },
    onError: () => {
      // teste
      router.push(routes.CLIENT_HOME)
    }
  })
}

export const useDeleteProfessional = () => {
  const queryClient = useQueryClient()
  const queryFn = async (id: string) => {
    const response = await request({
      url: `/funcionarios/${id}`,
      method: 'DELETE'
    })

    return response
  }

  return useMutation({
    mutationKey: ['delete-professional'],
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salon-professionals'] })
    }
  })
}

// TESTE
export const useCurrentUser = (): User => {
  return {
    userId: 2,
    username: 'fernanda1',
    role: 'SALAO',
    idRelacao: 4
  }
}

export const useGetToken = () => {
  const site = getSiteConfigs()
  const headers = new Headers()
  headers.append(CONTENT_TYPE, 'application/x-www-form-urlencoded')

  const queryFn = async (grant_type: string) => {
    const data = {
      client_secret: site.keycloackClientSecret,
      client_id: site.keycloackClientId,
      grant_type
    }

    const body = Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      })
      .join('&')

    const response = (await request({
      url: `/realms/salao/protocol/openid-connect/token`,
      method: 'POST',
      body,
      headers,
      keycloack: true
    })) as ResponseGetToken

    return {
      accessToken: response.access_token
    }
  }

  return useMutation({
    mutationKey: ['get-token'],
    mutationFn: queryFn
  })
}
