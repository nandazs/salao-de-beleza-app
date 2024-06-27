import {
  Professional,
  RequestUpdateProfessionalServices
} from '@src/services/types'
import { createContext, useContext, useState } from 'react'

interface StateContextProps {
  schedule?: Schedule | undefined
  setSchedule: React.Dispatch<React.SetStateAction<Schedule | undefined>>
  salonId: string | undefined
  setSalonId: React.Dispatch<React.SetStateAction<string | undefined>>
  selectedProfessionalToEdit: RequestUpdateProfessionalServices | undefined
  setSelectedProfessionalToEdit: React.Dispatch<
    React.SetStateAction<RequestUpdateProfessionalServices | undefined>
  >
  selectedProfessionalByClient?: Professional
  setSelectedProfessionalByClient: React.Dispatch<
    React.SetStateAction<Professional | undefined>
  >
}

export interface Schedule {
  clientId?: string
  salonId?: string
  professional?: {
    name: string
    id: string
  }
  service?: string
  date?: string
  time?: string
}

export const StateContext = createContext<StateContextProps>({
  schedule: undefined,
  setSchedule: () => null,
  salonId: undefined,
  setSalonId: () => null,
  selectedProfessionalToEdit: undefined,
  setSelectedProfessionalToEdit: () => null,
  selectedProfessionalByClient: undefined,
  setSelectedProfessionalByClient: () => null
})

export const useAppContext = () => {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('StateContext must be used within a StateContextProvider')
  }
  return context
}

export const useAppStore = () => {
  const [schedule, setSchedule] = useState<Schedule | undefined>()
  const [salonId, setSalonId] = useState<string | undefined>()
  const [selectedProfessionalToEdit, setSelectedProfessionalToEdit] = useState<
    RequestUpdateProfessionalServices | undefined
  >()
  const [selectedProfessionalByClient, setSelectedProfessionalByClient] =
    useState<Professional | undefined>()

  console.log('oweksodksodsosd', salonId)

  return {
    schedule,
    setSchedule,
    salonId,
    setSalonId,
    selectedProfessionalToEdit,
    setSelectedProfessionalToEdit,
    selectedProfessionalByClient,
    setSelectedProfessionalByClient
  }
}
