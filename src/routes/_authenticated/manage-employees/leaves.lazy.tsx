import { createLazyFileRoute } from '@tanstack/react-router'
import Leaves from '@/features/manage-employees/leaves'

export const Route = createLazyFileRoute(
  '/_authenticated/manage-employees/leaves',
)({
  component: Leaves,
})
