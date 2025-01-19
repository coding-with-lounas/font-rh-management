import React from 'react'
import { GenericMutateDrawer, Field } from './generic-mutate-drawer'
import { GenericImportDialog } from './generic-import-dialog'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface GenericDialogsProps<T> {
  open: string | null
  setOpen: (open: string | null) => void
  currentItem: T | null
  setCurrentItem: (item: T | null) => void
  formFields: Field[]
  formTitle: string
  formDescription: string
  onSubmit: (data: T) => void
  onDelete: (item: T) => void
  importTitle: string
  importDescription: string
  onImport: (file: File) => void
}

export function GenericDialogs<T>({
  open,
  setOpen,
  currentItem,
  setCurrentItem,
  formFields,
  formTitle,
  formDescription,
  onSubmit,
  onDelete,
  importTitle,
  importDescription,
  onImport,
}: GenericDialogsProps<T>) {
  return (
    <>
      <GenericMutateDrawer
        open={open === 'create' || open === 'update'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? (currentItem ? 'update' : 'create') : null)
          if (!isOpen) setCurrentItem(null)
        }}
        currentData={currentItem}
        fields={formFields}
        title={currentItem ? `Edit ${formTitle}` : `Create ${formTitle}`}
        description={formDescription}
        onSubmit={onSubmit}
      />

      <GenericImportDialog
        open={open === 'import'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'import' : null)}
        onImport={onImport}
        title={importTitle}
        description={importDescription}
      />

      {currentItem && (
        <ConfirmDialog
          open={open === 'delete'}
          onOpenChange={(isOpen) => {
            setOpen(isOpen ? 'delete' : null)
            if (!isOpen) setCurrentItem(null)
          }}
          title={`Delete ${formTitle}`}
          description={`Are you sure you want to delete this ${formTitle.toLowerCase()}?`}
          onConfirm={() => {
            onDelete(currentItem)
            setOpen(null)
            setCurrentItem(null)
          }}
        />
      )}
    </>
  )
}

