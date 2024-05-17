import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AgendamentoSliceProps {
  agendamento?: AgendamentoProps
  servico: string
  date: string
  horario: string
  funcionario: string
}

interface AgendamentoProps {
  servico: string
  horario: string
  data: string
  funcionario: string
}

const initialState: AgendamentoSliceProps = {
  agendamento: undefined,
  servico: '',
  date: '',
  horario: '',
  funcionario: ''
}

export const agendamentoSlice = createSlice({
  name: 'agendamento',
  initialState,
  reducers: {
    setAgendamento: (state, action: PayloadAction<AgendamentoProps>) => {
      state.agendamento = action.payload
    },
    setServico: (state, action: PayloadAction<string>) => {
      state.servico = action.payload
    },
    setFuncionario: (state, action: PayloadAction<string>) => {
      state.funcionario = action.payload
    }
  }
})

export const { setAgendamento, setServico, setFuncionario } =
  agendamentoSlice.actions

const agendamentoReducer = agendamentoSlice.reducer

export default agendamentoReducer
