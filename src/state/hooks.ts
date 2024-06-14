import { createContext, useContext, useState } from 'react'

interface StateContextProps {
  agendamento?: AgendamentoProps
  setAgendamento: React.Dispatch<
    React.SetStateAction<AgendamentoProps | undefined>
  >
}

export const StateContext = createContext<StateContextProps>({
  agendamento: undefined,
  setAgendamento: () => null
})

interface AgendamentoProps {
  hora: string
  data: string
  servico: string
  profissional: string
  cliente: string
}

export const useAppContext = () => {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('StateContext must be used within a StateContextProvider')
  }
  return context
}

export const useAppStore = () => {
  const [agendamento, setAgendamento] = useState<AgendamentoProps | undefined>()

  return {
    agendamento,
    setAgendamento
  }
}
