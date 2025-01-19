import React from 'react'
import { Button } from '@/components/ui/button'

export interface ButtonConfig {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
}

interface GenericPrimaryButtonsProps {
  buttons: ButtonConfig[]
}

export function GenericPrimaryButtons({ buttons }: GenericPrimaryButtonsProps) {
  return (
    <div className="flex space-x-2">
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          variant={button.variant || 'default'}
        >
          {button.icon && <span className="mr-2">{button.icon}</span>}
          {button.label}
        </Button>
      ))}
    </div>
  )
}

