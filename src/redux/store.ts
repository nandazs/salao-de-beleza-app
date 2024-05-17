import { configureStore } from '@reduxjs/toolkit'
import agendamentoReducer from './slices/agedamento'

export const reducer = {
  agendamento: agendamentoReducer
}

const store = configureStore({
  reducer
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
