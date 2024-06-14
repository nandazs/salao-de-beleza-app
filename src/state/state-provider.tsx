import React, { ReactNode } from 'react'
import { StateContext, useAppStore } from './hooks'

export const StateContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const store = useAppStore()

  return <StateContext.Provider value={store}>{children}</StateContext.Provider>
}
