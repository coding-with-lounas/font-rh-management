import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  sexe: z.string(),
  service: z.string(),
  mail: z.string().email(),
  date_of_birth: z.date(),
  date_of_employment: z.date(),
})

export type Task = z.infer<typeof taskSchema>
