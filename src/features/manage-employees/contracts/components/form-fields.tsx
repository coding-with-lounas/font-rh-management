export const formFields = [
    { name: 'name', label: 'Contract Name', type: 'text' as const },
    { name: 'clientName', label: 'Client Name', type: 'text' as const },
    { name: 'startDate', label: 'Start Date', type: 'date' as const },
    { name: 'endDate', label: 'End Date', type: 'date' as const },
    { name: 'value', label: 'Contract Value', type: 'text' as const },
    { name: 'status', label: 'Status', type: 'select' as const, options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Completed', value: 'completed' },
      { label: 'Terminated', value: 'terminated' },
    ]},
  ]
  
  