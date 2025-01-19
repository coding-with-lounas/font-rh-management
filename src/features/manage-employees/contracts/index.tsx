import React from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns, filterableColumns } from './components/columns'
import { DataTable } from '@/components/data-table/dt/data-table'
import { GenericDialogs } from '@/components/data-table/generic-dialogs'
import { GenericPrimaryButtons } from '@/components/data-table/generic-primary-buttons'
import { sampleContracts } from './data/sample-contracts'
import ContractsProvider, { useContracts } from './context/contracts-context'
import { formFields } from './components/form-fields'
import { IconPlus, IconPrinter, IconFileUpload } from '@tabler/icons-react'
import { Contract } from './data/contract'

function ContractsContent() {
  const { open, setOpen, currentContract, setCurrentContract } = useContracts()

  const handleSubmit = (data: Partial<Contract>) => {
    console.log('Submitting contract data:', data)
    setOpen(null)
  }

  const handleDelete = (contract: Contract) => {
    console.log('Deleting contract:', contract)
    setOpen(null)
  }

  const handleImport = (file: File) => {
    console.log('Importing contracts from file:', file)
    setOpen(null)
  }

  const handleRowsSelected = (rows: Contract[]) => {
    console.log('Selected rows:', rows)
  }

  const handlePrint = () => {
    window.print()
  }

  const buttonConfigs = [
    {
      label: 'Import',
      onClick: () => setOpen('import'),
      icon: <IconFileUpload size={18} />,
      variant: 'outline' as const,
    },
    {
      label: 'Print',
      onClick: handlePrint,
      icon: <IconPrinter size={18} />,
      variant: 'outline' as const,
    },
    {
      label: 'Add Contract',
      onClick: () => {
        setCurrentContract(null)
        setOpen('create')
      },
      icon: <IconPlus size={18} />,
    },
  ]

  return (
    <>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contracts</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your Contracts!
            </p>
          </div>
          <GenericPrimaryButtons buttons={buttonConfigs} />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable 
            data={sampleContracts} 
            columns={columns} 
            filterColumn="name"
            facetedFilterColumns={filterableColumns}
            onRowsSelected={handleRowsSelected}
          />
        </div>
      </Main>

      <GenericDialogs
        open={open}
        setOpen={setOpen}
        currentItem={currentContract}
        setCurrentItem={setCurrentContract}
        formFields={formFields}
        formTitle="Contract"
        formDescription="Add or edit contract details"
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        importTitle="Import Contracts"
        importDescription="Import contract data from a CSV file"
        onImport={handleImport}
      />
    </>
  )
}

export default function Contracts() {
  return (
    <ContractsProvider>
      <ContractsContent />
    </ContractsProvider>
  )
}

