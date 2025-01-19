import { Task } from './schema'

export const tasks: Task[] = [
  {
    id: 'EMP-001',
    name: 'John',
    surname: 'Doe',
    sexe: 'Male',
    service: 'IT',
    mail: 'john.doe@example.com',
    date_of_birth: new Date('1990-01-15'),
    date_of_employment: new Date('2020-03-01'),
  },
  {
    id: 'EMP-002',
    name: 'Jane',
    surname: 'Smith',
    sexe: 'Female',
    service: 'HR',
    mail: 'jane.smith@example.com',
    date_of_birth: new Date('1988-07-22'),
    date_of_employment: new Date('2019-11-15'),
  },
  // Add more employee records as needed...
]
