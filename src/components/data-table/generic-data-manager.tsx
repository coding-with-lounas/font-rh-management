import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './dt/data-table'
import { GenericPrimaryButtons, ButtonConfig } from './generic-primary-buttons'
import { GenericDialogs } from './generic-dialogs'
import { Field } from './generic-mutate-drawer'

interface GenericDataManagerProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  filterColumn?: string
  facetedFilterColumns?: string[]
  actions: ButtonConfig[]
  formFields: Field[]
  formTitle: string
  formDescription: string
  importTitle: string
  importDescription: string
  onSubmit: (data: T) => void
  onDelete: (item: T) => void
  onImport: (file: File) => void
}

export function GenericDataManager<T extends { id: string | number }>({
  data,
  columns,
  filterColumn,
  facetedFilterColumns,
  actions,
  formFields,
  formTitle,
  formDescription,
  importTitle,
  importDescription,
  onSubmit,
  onDelete,
  onImport,
}: GenericDataManagerProps<T>) {
  const [open, setOpen] = useState<string | null>(null)
  const [currentItem, setCurrentItem] = useState<T | null>(null)

  const handleCreate = () => {
    setCurrentItem(null)
    setOpen('create')
  }

  const handleEdit = (item: T) => {
    setCurrentItem(item)
    setOpen('update')
  }

  const handleDelete = (item: T) => {
    setCurrentItem(item)
    setOpen('delete')
  }

  const tableColumns: ColumnDef<T>[] = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(row.original)}>Edit</button>
          <button onClick={() => handleDelete(row.original)}>Delete</button>
        </div>
      ),
    },
  ]

  const allActions: ButtonConfig[] = [
    ...actions,
    { label: 'Create', onClick: handleCreate },
    { label: 'Import', onClick: () => setOpen('import') },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{formTitle}</h2>
        <GenericPrimaryButtons buttons={allActions} />
      </div>
      <DataTable
        columns={tableColumns}
        data={data}
        filterColumn={filterColumn}
        facetedFilterColumns={facetedFilterColumns}
      />
      <GenericDialogs
        open={open}
        setOpen={setOpen}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        formFields={formFields}
        formTitle={formTitle}
        formDescription={formDescription}
        onSubmit={onSubmit}
        onDelete={onDelete}
        importTitle={importTitle}
        importDescription={importDescription}
        onImport={onImport}
      />
    </div>
  )
}

