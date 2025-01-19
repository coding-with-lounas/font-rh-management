import { createLazyFileRoute } from '@tanstack/react-router'
import ContractsPage from '@/features/manage-employees/contracts'

export const Route = createLazyFileRoute(
  '/_authenticated/manage-employees/contracts',
)({
  component: ContractsPage,
})
