import {
  normalizeClientSchedules,
  normalizeErrorResponse,
  normalizeSalonSchedules,
  normalizedLogin
} from '../normalizers/normalizers'
import {
  deleteProfessional,
  getProfessionalsBySalon,
  getProfessionalsTimes,
  getSalonSchedules,
  login,
  registerProfessional,
  registerSchedule
} from './queries'
import { request } from './request'
import {
  LoginRequest,
  RequestRegisterProfessional,
  RequestRegisterSchedule,
  RequestUpdateProfessionalServices,
  ResponseGetAllSalon,
  User
} from './types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { routes } from '@src/configs/types/routes'
import { useRouter } from 'expo-router'

export const useGetAllSalons = () => {
  const queryFn = async () => {
    const response = (await request({
      url: `/salao`,
      method: 'GET'
    })) as Promise<ResponseGetAllSalon>

    const error = normalizeErrorResponse(response)

    //console.log('OKSDOSDKOSD', error)

    if (error.hasError) {
      //throw { error }
      /// return []
    }

    return response ?? []
  }

  return useQuery({
    queryKey: ['all-salons'],
    queryFn,
    enabled: true,
    //initialData: [],
    throwOnError: false
  })
}

export const useGetClientSchedules = (id: number) => {
  const queryFn = async () => {
    const response = await request({
      url: `/agendamentos/cliente/${id}`,
      method: 'GET'
    })

    const error = normalizeErrorResponse(response)

    if (error.hasError) {
      throw { error }
    }

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
    const response = await getSalonSchedules(id)

    if (!response) {
      return
    }

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
    const response = await getProfessionalsBySalon(id)

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

export const useGetProfessionalsTimes = (id: string) => {
  const queryFn = async () => {
    const response = await getProfessionalsTimes(id)

    if (!response) {
      return
    }

    return response
  }

  return useQuery({
    queryKey: ['professionals-times'],
    queryFn: queryFn,
    enabled: true
  })
}

export const useRegisterProfessional = () => {
  const queryFn = async (props: RequestRegisterProfessional) => {
    const response = await registerProfessional(props)

    if (!response) {
      return
    }

    return response
  }

  return useMutation({
    mutationKey: ['register-professional'],
    mutationFn: queryFn
  })
}

export const useRegisterSchedule = () => {
  const queryFn = async (props: RequestRegisterSchedule) => {
    const response = await registerSchedule(props)

    if (!response) {
      return
    }

    return response
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

    const error = normalizeErrorResponse(response)

    if (error.hasError) {
      throw { error }
    }

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

    const error = normalizeErrorResponse(response)

    if (error.hasError) {
      throw { error }
    }

    setCurrentUser(response)

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

    const error = normalizeErrorResponse(response)

    if (error.hasError) {
      //  throw { error }
    }

    return normalizedLogin(response)
  }

  return useMutation({
    mutationKey: ['login'],
    mutationFn: queryFn,
    onSuccess: () => {
      const { data } = useGetUserData()

      if (data?.role === 'SALAO') {
        router.push(routes.ADMIN_HOME)
      } else {
        router.push(routes.CLIENT_HOME)
      }
    },
    onError: () => {
      // teste
      console.log('TESTEEEIJISDJISDJ')
      router.push(routes.ADMIN_HOME)
    }
  })
}

export const setCurrentUser = async (user?: User) => {
  if (user) {
    const jsonValue = JSON.stringify(user)
    AsyncStorage.setItem('user', jsonValue)
  }
}

export const useDeleteProfessional = () => {
  const queryClient = useQueryClient()
  const queryFn = async (id: string) => {
    const response = await deleteProfessional(id)

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

export const useCurrentUser = (): User => {
  return {
    userId: 2,
    username: 'fernanda1',
    role: 'SALAO',
    idRelacao: 4
  }
}
