import { createLazyFileRoute } from '@tanstack/react-router'
import Tasks from '@/features/manage-employees/employees'

export const Route = createLazyFileRoute(
  '/_authenticated/manage-employees/employees',
)({
  component: Tasks,
})
