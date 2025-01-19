import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'surname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Surname' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='font-medium'>
            {row.getValue('surname')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'sexe',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sex' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[100px] items-center'>
          <span>{row.getValue('sexe')}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'service',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Service' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <Badge variant='outline'>{row.getValue('service')}</Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'mail',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[200px] truncate'>
            {row.getValue('mail')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'date_of_birth',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date of Birth' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date_of_birth') as Date
      return (
        <div className='flex space-x-2'>
          <span>{date.toLocaleDateString()}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'date_of_employment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Employment Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('date_of_employment') as Date
      return (
        <div className='flex space-x-2'>
          <span>{date.toLocaleDateString()}</span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

