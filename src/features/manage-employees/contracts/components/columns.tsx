import { ColumnDef } from '@tanstack/react-table'
import { Contract } from '../data/contract'
import { DataTableColumnHeader } from '@/components/data-table/dt/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableRowActions } from '@/components/data-table/dt/data-table-row-actions'
import { useContracts } from '../context/contracts-context'

export const columns: ColumnDef<Contract>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contract Name" />
    ),
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client" />
    ),
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => new Date(row.getValue('startDate')).toLocaleDateString(),
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => new Date(row.getValue('endDate')).toLocaleDateString(),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value" />
    ),
    cell: ({ row }) => `$${row.getValue<number>('value').toLocaleString()}`,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge variant={
          status === 'active' ? 'default' :
          status === 'pending' ? 'secondary' :
          status === 'completed' ? 'success' :
          'destructive'
        }>
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const contract = row.original
      const { setOpen, setCurrentContract } = useContracts()
      return (
        <DataTableRowActions
          row={row}
          actions={[
            {
              label: 'Edit',
              onClick: () => {
                setCurrentContract(contract)
                setOpen('update')
              },
            },
            {
              label: 'Delete',
              onClick: () => {
                setCurrentContract(contract)
                setOpen('delete')
              },
            },
          ]}
        />
      )
    },
  },
]

export const filterableColumns = [
  {
    id: 'status',
    title: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
      { value: 'terminated', label: 'Terminated' },
    ],
  },
]

