import React from 'react'
import { GenericDataManager } from '@/components/data-table/generic-data-manager'
import { Contract } from '../data/contract'
import { columns } from './columns'
import { formFields } from './form-fields'
import { sampleContracts } from '../data/sample-contracts'
import { IconDownload, IconPlus } from '@tabler/icons-react'
import { useContracts } from '../context/contracts-context'

export function ContractsManager() {
  const { setOpen, setCurrentContract } = useContracts()

  const handleSubmit = (data: Partial<Contract>) => {
    console.log('Submitting contract data:', data)
    // Implement your submit logic here
  }

  const handleDelete = (contract: Contract) => {
    console.log('Deleting contract:', contract)
    // Implement your delete logic here
  }

  const handleImport = (file: File) => {
    console.log('Importing contracts from file:', file)
    // Implement your import logic here
  }

  return (
    <GenericDataManager<Contract>
      data={sampleContracts}
      columns={columns}
      filterColumn="name"
      facetedFilterColumns={['status']}
      actions={[
        {
          label: 'Add Contract',
          onClick: () => {
            setCurrentContract(null)
            setOpen('create')
          },
          icon: <IconPlus size={18} />,
        },
        {
          label: 'Import',
          onClick: () => setOpen('import'),
          icon: <IconDownload size={18} />,
          variant: 'outline',
        },
      ]}
      formFields={formFields}
      formTitle="Contract"
      formDescription="Add or edit contract details"
      importTitle="Import Contracts"
      importDescription="Import contract data from a CSV file"
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onImport={handleImport}
    />
  )
}

