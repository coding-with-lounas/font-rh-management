import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Contract } from '../data/contract'

type ContractsDialogType = 'create' | 'update' | 'delete' | 'import'

interface ContractsContextType {
  open: ContractsDialogType | null
  setOpen: (str: ContractsDialogType | null) => void
  currentContract: Contract | null
  setCurrentContract: React.Dispatch<React.SetStateAction<Contract | null>>
}

const ContractsContext = React.createContext<ContractsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ContractsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ContractsDialogType>(null)
  const [currentContract, setCurrentContract] = useState<Contract | null>(null)
  return (
    <ContractsContext.Provider value={{ open, setOpen, currentContract, setCurrentContract }}>
      {children}
    </ContractsContext.Provider>
  )
}

export const useContracts = () => {
  const contractsContext = React.useContext(ContractsContext)

  if (!contractsContext) {
    throw new Error('useContracts has to be used within <ContractsContext>')
  }

  return contractsContext
}

