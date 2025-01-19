export interface Contract {
    id: string
    name: string
    clientName: string
    startDate: string
    endDate: string
    value: number
    status: 'active' | 'pending' | 'completed' | 'terminated'
  }
  
  